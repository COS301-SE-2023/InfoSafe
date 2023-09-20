package com.fragile.infosafe.primary.requests;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AssignedTaskRequest {
    private int user_Id;
    private int task_Id;
}
