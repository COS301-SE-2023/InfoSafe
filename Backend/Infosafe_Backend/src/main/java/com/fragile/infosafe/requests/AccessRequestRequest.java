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
public class AccessRequestRequest {
    private int request_id;
    private int user_id;
    private int ds_id;
    private String reason;
    private Boolean status;
}
