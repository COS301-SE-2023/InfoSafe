package com.example.infosafe_backend.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name="matrices")
public class Matrix {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long task_id;
    private String description;
    private String status;
    private Date due_date;
    private Date date_completed;

    public Long getTask_id() {
        return task_id;
    }

    public void setTask_id(Long task_id) {
        this.task_id = task_id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getDue_date() {
        return due_date;
    }

    public void setDue_date(Date due_date) {
        this.due_date = due_date;
    }

    public Date getDate_completed() {
        return date_completed;
    }

    public void setDate_completed(Date date_completed) {
        this.date_completed = date_completed;
    }
}