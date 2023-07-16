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
    private int dataScopeID;
    private String dsName;
    private String dsDescription;
    private String dateCaptured;
    private String dsStatus;
}

