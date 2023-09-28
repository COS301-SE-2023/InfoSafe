package com.fragile.infosafe.primary.controller;

import com.fragile.infosafe.primary.model.Task;
import com.fragile.infosafe.primary.model.User;
import com.fragile.infosafe.primary.requests.TaskCompleteRequest;
import com.fragile.infosafe.primary.service.DeleteService;
import com.fragile.infosafe.primary.service.TaskService;
import com.fragile.infosafe.primary.requests.TaskRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.sql.Delete;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("api/task")
@RequiredArgsConstructor
@Slf4j
public class TaskController {
    private final TaskService service;

    @PostMapping("/addTask")
    public ResponseEntity addTask(@RequestBody TaskRequest task) {
        log.info("Adding a task");
        log.info(String.valueOf(task));
        return ResponseEntity.ok(service.createTask(task));
    }

    @GetMapping("/getTask")
    public List<Task> list() { return service.getAllTasks(); }

    @PostMapping("/update/{id}")
    public Task updateTask (@PathVariable("id") int task_id, @RequestBody TaskRequest request) {
        log.info(String.valueOf(request));
        return service.updateTask(request);
    }

    @GetMapping("/totalTasks")
    public long getTotalTasks() {
        return service.countTotalTasks();
    }

    @PostMapping("/completeTask")
    public ResponseEntity<String> setCompletedTasks(@RequestBody TaskCompleteRequest taskCompleteRequest) {
        return ResponseEntity.ok(service.removeTask(taskCompleteRequest));
    }

    @GetMapping("/getUsersOfTask/{id}")
    public ResponseEntity<List<String>> getUsersOfTask(@PathVariable("id") int task_id){
        return ResponseEntity.ok(service.findUsersOfTask(task_id));
    }
}
