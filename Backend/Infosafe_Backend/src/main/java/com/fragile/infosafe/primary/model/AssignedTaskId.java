package com.fragile.infosafe.model;

import java.io.Serializable;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@IdClass(AssignedTaskId.class)
@Table(name="assigned_task_id")
public class AssignedTaskId implements Serializable {
    @Id
    @GeneratedValue
    private Long id;

    public Long getUser_Id() {
        return user_Id;
    }

    public void setUser_Id(Long user_Id) {
        this.user_Id = user_Id;
    }

    public Long getTask_Id() {
        return task_Id;
    }

    public void setTask_Id(Long task_Id) {
        this.task_Id = task_Id;
    }

    private Long user_Id;
    private Long task_Id;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}
