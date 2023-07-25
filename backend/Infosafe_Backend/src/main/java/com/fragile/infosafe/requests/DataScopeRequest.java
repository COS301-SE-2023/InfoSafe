package com.fragile.infosafe.requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DataScopeRequest {
    private int data_scope_id;
    private String ds_name;
    private String ds_description;
    private String date_captured;
    private String ds_status;
}

