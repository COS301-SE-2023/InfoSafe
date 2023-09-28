package com.fragile.infosafe.primary.requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DataScopeRoleRequest {
    private int datascope;
    private String role_type;
    private String role_description;

}
