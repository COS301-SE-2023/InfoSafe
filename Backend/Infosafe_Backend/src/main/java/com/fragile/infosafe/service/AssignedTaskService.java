package com.fragile.infosafe.service;

import com.fragile.infosafe.model.AssignedTask;
import com.fragile.infosafe.repository.AssignedTaskRepository;
import com.fragile.infosafe.requests.AssignedTaskRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AssignedTaskService {

    private final AssignedTaskRepository atRepository;

    public List<AssignedTask> getAllAssignedTasks() { return atRepository.findAll(); }

    public ResponseEntity<String> makeAssignedTask(AssignedTaskRequest atRequest){
        var assignedTask = AssignedTask.builder()
                .task_id(atRequest.getTask_id())
                .user_id(atRequest.getUser_id())
                .ds_id(atRequest.getDs_id())
                .build();
        atRepository.save(assignedTask);
        return ResponseEntity.status(HttpStatus.OK).body("Assgined Task Created.");
    }
}
