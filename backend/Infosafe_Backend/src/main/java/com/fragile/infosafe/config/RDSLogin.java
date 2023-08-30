package com.fragile.infosafe.config;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RDSLogin {
    private String username;
    private String password;
    private String engine;
    private String host;
    private String port;
    private String dbname;
    private String dbInstanceIdentifier;
    private String region;
}
