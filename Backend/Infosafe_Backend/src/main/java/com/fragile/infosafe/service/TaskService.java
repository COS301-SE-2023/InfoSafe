package com.fragile.infosafe.service;

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
        var matrix = Task.builder()
                .task_id(request.getTask_id())
                .task_description(request.getTask_description())
                .task_status(request.getTask_status())
                .due_date(request.getDue_date())
                .date_created(request.getDate_created())
                .build();
        taskRepository.save(matrix);
        return ResponseEntity.status(HttpStatus.OK).body("added");
    }

    public List<Task> getAllTasks() {return taskRepository.findAll();}

    public Task updateTask(Task task) {return taskRepository.save(task);}


}
