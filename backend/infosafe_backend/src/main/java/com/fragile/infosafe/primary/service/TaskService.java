package com.fragile.infosafe.primary.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fragile.infosafe.primary.model.DataScope;
import com.fragile.infosafe.primary.model.Task;
import com.fragile.infosafe.primary.model.User;
import com.fragile.infosafe.primary.repository.DataScopeRepository;
import com.fragile.infosafe.primary.repository.TaskRepository;
import com.fragile.infosafe.primary.repository.UserRepository;
import com.fragile.infosafe.primary.requests.TaskRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Slf4j
public class TaskService {

    private final TaskRepository taskRepository;
    private final DataScopeRepository dataScopeRepository;
    private final UserRepository userRepository;

    public ResponseEntity<String> createTask(TaskRequest request) {
        try {
            Task task = Task.builder()
                    .task_name(request.getTask_name())
                    .task_description(request.getTask_description())
                    .task_status(request.getTask_status())
                    .due_date(request.getDue_date())
                    .date_created(request.getDate_created())
                    .build();

            if (dataScopeRepository.findByDataScopeId(request.getDataScope_id()).isPresent()) {
                DataScope dataScope = dataScopeRepository.findByDataScopeId(request.getDataScope_id()).get();
                log.info("This is the datascope " + dataScope);
                task.setDataScope(dataScope);
            }
            if (!request.getUsers_email().isEmpty()) {
                Set<User> users = new HashSet<>();
                for (String userEmail : request.getUsers_email()) {
                    User user = userRepository.findByEmail(userEmail).orElse(null);
                    if (user != null) {
                        users.add(user);
                    } else {
                        log.error("User with email " + userEmail + " not found");
                    }
                }
                task.setUsers(users);
            }
            taskRepository.save(task);
            return ResponseEntity.status(HttpStatus.OK).body("Added task");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating task");
        }
    }

    public List<Task> getAllTasks() {return taskRepository.findAll();}

    public Task updateTask(Task task) {return taskRepository.save(task);}

    public int countTasksForUser(User user) {
        return taskRepository.countTasksByUsersContains(user);
    }

    public int countDataScopesForUser(User user) {
        List<Task> tasks = taskRepository.findDistinctTasksByUsersContains(user);

        Set<DataScope> uniqueDataScopes = new HashSet<>();
        for (Task task : tasks) {
            uniqueDataScopes.add(task.getDataScope());
        }
        return uniqueDataScopes.size();
    }

    public List<Task> getTasksAssociatedWithUser(User user) {
        return taskRepository.findByUsers(user);
    }
}
