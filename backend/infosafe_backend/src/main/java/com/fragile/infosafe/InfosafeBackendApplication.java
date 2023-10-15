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

    //Uncomment the below code if this is your first time use
    //This will create an admin role in the system and create your first profile

    @Autowired
    private RoleRepository roleRepository;
//
//    @Bean
//    public CommandLineRunner cr (AuthenticationService service){
//        return args -> {
//            Role admin = roleRepository.findByRole_name("ADMIN");
//
//            if (admin == null){
//                admin = new Role();
//                admin.setRole_Name("ADMIN");
//                admin.setPermissions(134217727);
//                roleRepository.save(admin);
//                System.out.println("Admin Role Created");
//            }
//            else{
//                System.out.println("Admin Role Already Exists");
//            }
//        };
//    }
//
//    @Bean
//    public CommandLineRunner commandLineRunner(AuthenticationService service) {
//        return args -> {
//            var adminRole = roleRepository.findByRole_name("ADMIN");
//            if (adminRole == null) {
//                System.err.println("'ADMIN' role not found in the database.");
//                return;
//            }
//            var admin = RegisterRequest.builder()
//                    .first_name("John")
//                    .last_name("Smith")
//                    .email("john.smith@gmail.com")
//                    .password("Password@1234")
//                    .role(adminRole)
//                    .build();
//
//            System.out.println("Admin token: " + service.register(admin).getAccessToken());
//        };
//    }
}

