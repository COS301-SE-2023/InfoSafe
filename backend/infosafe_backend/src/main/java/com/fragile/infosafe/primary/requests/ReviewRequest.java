package com.fragile.infosafe.primary.requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReviewRequest {
    private boolean review;
    private int request_id;
    private int asset_id;
    private int dataScope_id;
    private int task_id;
    private String user_email;
    private String supportType;
}
