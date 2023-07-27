package com.fragile.infosafe.model;

import jakarta.annotation.Nullable;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
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
@Table(name="assigned_tasks")
public class AssignedTask {

    @Id
    private int task_id;
    private int user_id;

    @Nullable
    private int ds_id;

    private int getTaskID() { return this.task_id; }

    private int getUserID() { return this.user_id; }

    private void setUserID(int user) { this.user_id = user; }

    private int getDataScopeID() { return this.ds_id; }
}
