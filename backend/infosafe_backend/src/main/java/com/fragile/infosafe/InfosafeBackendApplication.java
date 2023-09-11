package com.fragile.infosafe;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.Collections;
import java.util.Date;

import static com.fragile.infosafe.model.Role.*;


@SpringBootApplication
public class InfosafeBackendApplication {

    public static void main(String[] args) {

        SpringApplication infosafe = new  SpringApplication(InfosafeBackendApplication.class);
        infosafe.setDefaultProperties(Collections.singletonMap("server.port", "80"));
        infosafe.run(args);
    }
}
