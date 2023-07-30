package com.fragile.infosafe;

import com.fragile.infosafe.auth.AuthenticationService;
import com.fragile.infosafe.requests.RegisterRequest;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import static com.fragile.infosafe.model.Role.ADMIN;
import static com.fragile.infosafe.model.Role.DATA_CUSTODIAN;

@SpringBootApplication
public class InfosafeBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(InfosafeBackendApplication.class, args);
    }

//    @Bean
//    public CommandLineRunner commandLineRunner(AuthenticationService service) {
//        return args -> {
//            var admin =  RegisterRequest.builder()
//                    .firstname("Alistair")
//                    .lastname("Ross")
//                    .email("ali@gmail.com")
//                    .password("1234")
//                    .role(DISO)
//                    .build();
//            System.out.println("Admin token: " + service.register(admin).getAccessToken());
//        };
//    }



}
