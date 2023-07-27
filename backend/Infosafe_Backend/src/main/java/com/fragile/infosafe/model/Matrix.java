package com.fragile.infosafe.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name="matrices")
public class Matrix {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long taskId;
    private String description;
    private String status;
    private Date dueDate;
    private Date dateCompleted;

    public Long getTaskId() {
        return taskId;
    }

    public void setTaskId(Long task_id) {
        this.taskId = task_id;
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

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date due_date) {
        this.dueDate = due_date;
    }

    public Date getDateCompleted() {
        return dateCompleted;
    }

    public void setDateCompleted(Date date_completed) {
        this.dateCompleted = date_completed;
    }
}