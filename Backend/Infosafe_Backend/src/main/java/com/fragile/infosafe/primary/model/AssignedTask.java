package com.fragile.infosafe.primary.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
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
@Table(name="assignedtask")
public class AssignedTask {
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

    @Id
    private Long user_Id;

    @Id
    private Long task_Id;
}
