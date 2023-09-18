package com.fragile.infosafe.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@IdClass(AssignedTask.class)
@Table(name="assigned_task")
public class AssignedTask implements Serializable {
    @Id
    //@ManyToOne(fetch = FetchType.LAZY)
    //@JoinColumn(name = "user_id")
    private int user_Id;

    @Id
    private int task_Id;
    public int getUser_Id() {
        return user_Id;
    }

    public void setUser_Id(int user_Id) {
        this.user_Id = user_Id;
    }

    public int getTask_Id() {
        return task_Id;
    }

    public void setTask_Id(int task_Id) {
        this.task_Id = task_Id;
    }
}
