package com.fragile.infosafe;

import com.fragile.infosafe.auth.AuthenticationService;
import com.fragile.infosafe.requests.RegisterRequest;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import static com.fragile.infosafe.model.Role.ADMIN;

@SpringBootApplication
public class InfosafeBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(InfosafeBackendApplication.class, args);
    }
}
