package com.fragile.infosafe.model_primary;

import java.io.Serializable;

public class AssignedTaskId implements Serializable {
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
}
