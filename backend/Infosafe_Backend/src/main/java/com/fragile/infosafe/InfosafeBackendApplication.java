package com.fragile.infosafe;
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


//    @Bean
//    public CommandLineRunner commandLineRunner(AuthenticationService service) {
//        return args -> {
//            var admin = RegisterRequest.builder()
//                    .first_name("Alistair")
//                    .last_name("Ross")
//                    .email("alistairmikeross@gmail.com")
//                    .password("1234")
//                    .role(ISO)
//                    .build();
//            System.out.println("Admin token: " + service.register(admin).getAccessToken());
//        };
//    }

}
