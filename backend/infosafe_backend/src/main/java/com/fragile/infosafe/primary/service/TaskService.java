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
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class TaskService {

    private final TaskRepository taskRepository;
    private final DataScopeRepository dataScopeRepository;
    private final UserRepository userRepository;

    public ResponseEntity<String> createTask(TaskRequest request) {
        try {
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            String dueDate = dateFormat.format(request.getDue_date());
            String dateCreated = dateFormat.format(request.getDate_created());
            Task task = Task.builder()
                    .task_name(request.getTask_name())
                    .task_description(request.getTask_description())
                    .task_status(request.getTask_status())
                    .due_date(dueDate)
                    .date_created(dateCreated)
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

    public List<Task> getAllTasks() {
        List<Task> tasks = taskRepository.findAll();
        for (Task task : tasks) {
            int daysUntilDueDate = getDaysUntilDueDate(task.getTask_id());
            task.setDaysUntilDue(daysUntilDueDate);
        }
        return tasks;
    }

    public Task updateTask(Task task) {return taskRepository.save(task);}

    public int countTasksForUser(User user) {
        return taskRepository.countTasksByUsersContains(user);
    }

    public int getDaysUntilDueDate(int taskId) {
        Optional<Task> optionalTask = taskRepository.findById(taskId);

        if (optionalTask.isPresent()) {
            Task task = optionalTask.get();
            String dueDateStr = task.getDue_date();

            if (dueDateStr != null) {
                try {
                    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
                    Date dueDate = dateFormat.parse(dueDateStr);
                    Date currentDate = new Date();

                    long timeDifferenceMillis = dueDate.getTime() - currentDate.getTime();

                    return (int) (timeDifferenceMillis / (1000 * 60 * 60 * 24));
                } catch (ParseException e) {
                    throw new IllegalArgumentException("Error parsing due_date: " + dueDateStr, e);
                }
            } else {
                throw new IllegalArgumentException("Task due_date is null for ID: " + taskId);
            }
        } else {
            throw new EntityNotFoundException("Task not found with ID: " + taskId);
        }
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

        List<Task> tasks = taskRepository.findByUsers(user);
        for (Task task : tasks) {
            int daysUntilDueDate = getDaysUntilDueDate(task.getTask_id());
            task.setDaysUntilDue(daysUntilDueDate);
        }
        return tasks;
    }
}
