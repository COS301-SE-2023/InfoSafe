package com.fragile.infosafe.controller;

import com.fragile.infosafe.model.Task;
import com.fragile.infosafe.requests.TaskRequest;
import com.fragile.infosafe.service.TaskService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("api/assignedTask")
@RequiredArgsConstructor
public class AssignedTaskController {
    private final TaskService service;

    @PostMapping("/addTask")
    public ResponseEntity addTask(@RequestBody TaskRequest Task) {
        log.info("Adding a task");
        return ResponseEntity.ok(service.makeT(Task));
    }

    @GetMapping("/getTask")
    public List<Task> list() {
        return service.getAllTasks();
    }
}
