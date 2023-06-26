package com.fragile.infosafe;

import com.fragile.infosafe.auth.AuthenticationService;
import com.fragile.infosafe.auth.RegisterRequest;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import static com.fragile.infosafe.model.Role.ADMIN;

@SpringBootApplication
public class InfosafeBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(InfosafeBackendApplication.class, args);
    }

    @Bean
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
    }

}
