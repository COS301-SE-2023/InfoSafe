package com.fragile.infosafe.controller;

import com.fragile.infosafe.model.AssignedTask;
import com.fragile.infosafe.requests.AssignedTaskRequest;
import com.fragile.infosafe.service.AssignedTaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/assignedTask")
@RequiredArgsConstructor
public class AssignedTaskController {

    private final AssignedTaskService atService;

    @PostMapping("/addAssignedTask")
    public ResponseEntity addAssignedTask(@RequestBody AssignedTaskRequest atRequest){
        return ResponseEntity.ok(atService.makeAssignedTask(atRequest));
    }

    @GetMapping("/getAssignedTask")
    public List<AssignedTask> list() { return atService.getAllAssignedTasks(); }
}
