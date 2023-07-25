package com.fragile.infosafe.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name="compliance_matrix")
public class ComplianceMatrix {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int task_id;
    private String task_description;
    private String task_status;
    private Date due_date;
    private Date date_completed;

    public int getTask_id() {
        return task_id;
    }

    public void setTask_id(int task_id) {
        this.task_id = task_id;
    }

    public String getTask_description() {
        return task_description;
    }

    public void setTask_description(String description) {
        this.task_description = description;
    }

    public String getTask_status() {
        return task_status;
    }

    public void setTask_status(String status) {
        this.task_status = status;
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