package com.fragile.infosafe.requests;

import com.fragile.infosafe.model.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DataScopeRequest {
    private String ds_name;
    private String ds_description;
    private String role_name;
    private String role_description;
    private Date date_captured;
    private String data_custodian;
    private String administrator;
    private String ds_status;
}

