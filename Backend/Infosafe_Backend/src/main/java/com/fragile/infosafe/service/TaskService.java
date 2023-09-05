package com.fragile.infosafe.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fragile.infosafe.model.Task;
import com.fragile.infosafe.repository.TaskRepository;
import com.fragile.infosafe.requests.TaskRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;

    public ResponseEntity<String> makeT(TaskRequest request){
        var task = Task.builder()
                .task_id(request.getTask_id())
                .task_description(request.getTask_description())
                .task_status(request.getTask_status())
                .due_date(request.getDue_date())
                .date_created(request.getDate_created())
                .build();
        taskRepository.save(task);
        TaskResponse response = new TaskResponse((long) task.getTask_id(), "added");
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonResponse;
        try {
            jsonResponse = objectMapper.writeValueAsString(response);
        } catch (JsonProcessingException e) {
            // Handle the exception, if needed
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating JSON response");
        }

        return ResponseEntity.status(HttpStatus.OK).body(jsonResponse);
    }

    public List<Task> getAllTasks() {return taskRepository.findAll();}

    public Task updateTask(Task task) {return taskRepository.save(task);}


}
