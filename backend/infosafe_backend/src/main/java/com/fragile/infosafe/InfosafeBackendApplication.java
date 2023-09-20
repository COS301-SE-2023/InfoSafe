package com.fragile.infosafe;

import com.fragile.infosafe.primary.auth.AuthenticationService;
import com.fragile.infosafe.primary.repository.RoleRepository;
import com.fragile.infosafe.primary.model.Role;
import com.fragile.infosafe.primary.requests.RegisterRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.Collections;

@SpringBootApplication
public class InfosafeBackendApplication {

    public static void main(String[] args) {

        SpringApplication infosafe = new  SpringApplication(InfosafeBackendApplication.class);
        infosafe.setDefaultProperties(Collections.singletonMap("server.port", "8080"));
        infosafe.run(args);
    }


//    @Autowired
//    private RoleRepository roleRepository;
//    @Bean
//    public CommandLineRunner commandLineRunner(AuthenticationService service) {
//        return args -> {
//            Role adminRole = roleRepository.findByRole_name("ADMIN");
//
//            var admin = RegisterRequest.builder()
//                    .first_name("Robyn")
//                    .last_name("Ross")
//                    .email("alistairmikeross@gmail.com")
//                    .password("1234")
//                    .role(adminRole)
//                    .build();
//
//            System.out.println("Admin token: " + service.register(admin).getAccessToken());
//        };
//    }
}

