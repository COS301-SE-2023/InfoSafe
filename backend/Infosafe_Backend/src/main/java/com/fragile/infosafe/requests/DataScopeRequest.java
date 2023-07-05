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
    private String dsName;
    private String description;
    private String roleName;
    private String roleDescription;
    private String dateCaptured;
    private String dataCustodian;
    private String administrator;
    private String status;
}

