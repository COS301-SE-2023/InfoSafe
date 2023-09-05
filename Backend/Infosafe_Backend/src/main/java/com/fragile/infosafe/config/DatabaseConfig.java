package com.fragile.infosafe.config;

import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DatabaseConfig {

    @Bean(name = "primaryDataSource")
    @Qualifier("primaryDataSource")
    public DataSource primaryDataSource() {
        return DataSourceBuilder
                .create()
                .url("jdbc:mysql://localhost:3306/infosafe")
                .username("root")
                .password("")
                .driverClassName("com.mysql.cj.jdbc.Driver")
                .build();
    }

    @Bean(name = "secondDataSource")
    @Qualifier("secondDataSource")
    public DataSource secondDataSource() {
        return DataSourceBuilder
                .create()
                .url("jdbc:mysql://localhost:3306/backup")
                .username("root")
                .password("")
                .driverClassName("com.mysql.cj.jdbc.Driver")
                .build();
    }
}
