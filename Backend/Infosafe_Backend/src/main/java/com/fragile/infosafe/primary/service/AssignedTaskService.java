package com.fragile.infosafe.primary.service;

import com.fragile.infosafe.primary.model.AssignedTask;
import com.fragile.infosafe.primary.repository.AssignedTaskRepository;
import com.fragile.infosafe.primary.requests.AssignedTaskRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AssignedTaskService {
    private final AssignedTaskRepository repository;

    public ResponseEntity<String> makeAT(AssignedTaskRequest request){
        var assignedTask = AssignedTask.builder()
                .user_Id(request.getUser_Id())
                .task_Id((request.getTask_Id()))
                .build();
        repository.save(assignedTask);
        return ResponseEntity.status(HttpStatus.OK).body("added");
    }

    public List<AssignedTask> getAllAssignedTasks() {return repository.findAll();}

    public AssignedTask updateDataScope(AssignedTask assignedTask) {return repository.save(assignedTask);}

    public List<AssignedTask> getAllTasks() { return repository.findAll(); }
}
