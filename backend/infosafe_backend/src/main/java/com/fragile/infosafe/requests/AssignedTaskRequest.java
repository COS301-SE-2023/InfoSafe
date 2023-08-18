package com.fragile.infosafe.requests;

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
    private Long user_Id;
    private Long task_Id;
}
