package com.fragile.infosafe.requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MatrixRequest {
    private int task_id;
    private String task_description;
    private String task_status;
    private Date due_date;
    private Date date_completed;
}
