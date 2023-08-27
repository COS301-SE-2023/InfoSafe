package com.fragile.infosafe;
import com.fragile.infosafe.auth.AuthenticationService;
import com.fragile.infosafe.model.Role;
import com.fragile.infosafe.repository.RoleRepository;
import com.fragile.infosafe.requests.RegisterRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.Date;

import static com.fragile.infosafe.model.Role.*;


@SpringBootApplication
public class InfosafeBackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(InfosafeBackendApplication.class, args);
    }

    @Autowired
    private RoleRepository roleRepository;

    @Bean
    public CommandLineRunner commandLineRunner(AuthenticationService service) {
        return args -> {
            Role adminRole = roleRepository.findByRoleName("NOTADMIN");

            var admin = RegisterRequest.builder()
                    .first_name("Chris")
                    .last_name("Ross")
                    .email("ChrisatAlistair@gmail.com")
                    .password("1234")
                    .role(adminRole)
                    .build();

            System.out.println("Admin token: " + service.register(admin).getAccessToken());
        };
    }
}

