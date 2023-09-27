package com.fragile.infosafe.primary.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fragile.infosafe.primary.model.DataScope;
import com.fragile.infosafe.primary.model.Task;
import com.fragile.infosafe.primary.model.User;
import com.fragile.infosafe.primary.repository.DataScopeRepository;
import com.fragile.infosafe.primary.repository.TaskRepository;
import com.fragile.infosafe.primary.repository.UserRepository;
import com.fragile.infosafe.primary.requests.TaskCompleteRequest;
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
    private final EmailService emailService;
    private final DeleteService deleteService;
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

            if (dataScopeRepository.findByDataScopeId(request.getData_scope_id()).isPresent()) {
                DataScope dataScope = dataScopeRepository.findByDataScopeId(request.getData_scope_id()).get();
                log.info("This is the datascope " + dataScope);
                task.setData_scope_id(dataScope);
            } else{
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No Datascope");
            }
            if (!request.getUsers_email().isEmpty()) {
                Set<User> users = new HashSet<>();
                DataScope dataScope = dataScopeRepository.findByDataScopeId(request.getData_scope_id()).get();
                for (String userEmail : request.getUsers_email()) {
                    User user = userRepository.findByEmail(userEmail).orElse(null);
                    if (user != null) {
                        users.add(user);
                        dataScope.getUsers().add(user);
                        sendEmail(userEmail, dataScope.getDs_name(), request);
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

    public Task updateTask(TaskRequest taskRequest) {
        Task task = taskRepository.findByTaskId(taskRequest.getTask_id()).get();
        task.setTask_description(taskRequest.getTask_description());
        task.setTask_name(taskRequest.getTask_name());
        task.setTask_status(taskRequest.getTask_status());
        task.setDaysUntilDue(taskRequest.getTask_id());
        DataScope dataScope = dataScopeRepository.findByDataScopeId(taskRequest.getData_scope_id()).get();
        task.setData_scope_id(dataScope);
        Set<User> oldUsers = task.getUsers();
        Set<User> users = new HashSet<>();
        for (String userEmail : taskRequest.getUsers()) {
            User user = userRepository.findByEmail(userEmail).orElse(null);
            if (user != null) {
                users.add(user);
                if(!oldUsers.contains(user)){
                    dataScope.getUsers().add(user);
                    sendEmail(userEmail, dataScope.getDs_name(), taskRequest);
                }
            } else {
                log.error("User with email " + userEmail + " not found");
            }
        }
        task.setUsers(users);
        return taskRepository.save(task);
    }

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
            uniqueDataScopes.add(task.getData_scope_id());
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

    public long countTotalTasks() {
        return taskRepository.count();
    }

    public void sendEmail(String userEmail, String dataScopeName, TaskRequest request){
        String subject = "New Task for Datascope " + dataScopeName;
        String body = "You have been assigned to the following Task\n" + request.getTask_name() + "\n" + request.getTask_description() + "\nDue Date: " + request.getDue_date();
        emailService.sendEmail(userEmail, subject, body);
    }

    public String removeTask(TaskCompleteRequest taskCompleteRequest){
        String completion = "Completed";
        if(taskCompleteRequest.isCompletion()){
            deleteService.deleteTaskAndSaveToSecondary(taskCompleteRequest.getTask_id(), completion);
            return "Completed Task removed";
        }else{
            completion = "Incomplete";
            deleteService.deleteTaskAndSaveToSecondary(taskCompleteRequest.getTask_id(), completion);
            return "Incomplete Task removed";
        }
    }

    public List<String> findUsersOfTask(int task_id) {
        return taskRepository.findUsersByTaskId(task_id);
    }
}
