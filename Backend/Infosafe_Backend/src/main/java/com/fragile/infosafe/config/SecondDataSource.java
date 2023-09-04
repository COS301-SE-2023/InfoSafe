package com.fragile.infosafe.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "second.datasource")
public class SecondDataSource {
    private String url;
    private String username;
    private String password;
    // Getters and setters
}

