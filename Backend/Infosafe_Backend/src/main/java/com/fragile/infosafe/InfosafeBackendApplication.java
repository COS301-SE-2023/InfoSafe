package com.fragile.infosafe;

import com.fragile.infosafe.auth.AuthenticationService;
import com.fragile.infosafe.auth.RegisterRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import static com.fragile.infosafe.user.Role.ADMIN;

@SpringBootApplication
public class InfosafeBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(InfosafeBackendApplication.class, args);
    }

    @Bean
    public CommandLineRunner commandLineRunner(AuthenticationService service) {
        return args -> {
            var admin =  RegisterRequest.builder()
                    .firstname("Alistair")
                    .lastname("Ross")
                    .email("alistairmikeross@gmail.com")
                    .password("Blackcar")
                    .role(ADMIN)
                    .build();
            System.out.println("Admin token: " + service.register(admin).getAccessToken());
        };
    }
}
