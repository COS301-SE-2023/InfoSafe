package com.fragile.infosafe;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class InfosafeBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(InfosafeBackendApplication.class, args);
    }

    /*@Bean
    public CommandLineRunner commandLineRunner(AuthenticationService service) {
        return args -> {
            var admin =  RegisterRequest.builder()
                    .firstname("Christof")
                    .lastname("Steyn")
                    .email("ChristofS@gmail.com")
                    .password("1234")
                    .role(ADMIN)
                    .build();
            System.out.println("Admin token: " + service.register(admin).getAccessToken());
        };
    }*/

}
