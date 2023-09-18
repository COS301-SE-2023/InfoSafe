package com.fragile.infosafe;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import java.util.Collections;

@SpringBootApplication
public class InfosafeBackendApplication {

    public static void main(String[] args) {

        SpringApplication infosafe = new  SpringApplication(InfosafeBackendApplication.class);
        infosafe.setDefaultProperties(Collections.singletonMap("server.port", "8080"));
        infosafe.run(args);
    }
}

