package com.fragile.infosafe.service;


public class TaskResponse {
    private Long task_id;
    private String message;

    public TaskResponse(Long task_id, String message) {
        this.task_id = task_id;
        this.message = message;
    }
}
