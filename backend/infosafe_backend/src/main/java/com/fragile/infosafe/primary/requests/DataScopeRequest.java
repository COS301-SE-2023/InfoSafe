package com.fragile.infosafe.primary.requests;

import com.fragile.infosafe.primary.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DataScopeRequest {
    private int data_scope_id;
    private String ds_name;
    private String ds_description;
    private Date date_captured;
    private int data_custodian;
    private String ds_status;
    private Set<String> user_email = new HashSet<>();
}

