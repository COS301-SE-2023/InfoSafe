package com.fragile.infosafe;
import com.fragile.infosafe.primary.auth.AuthenticationService;
import com.fragile.infosafe.primary.model.Role;
import com.fragile.infosafe.primary.repository.RoleRepository;
import com.fragile.infosafe.primary.requests.RegisterRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;


@SpringBootApplication
// @EntityScan(basePackages = {"com.fragile.infosafe.delete.deletemodel", "com.fragile.infosafe.primary.model"})
public class InfosafeBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(InfosafeBackendApplication.class, args);
    }

//
//    @Autowired
//    private RoleRepository roleRepository;
//
//
//    @Bean
//    public CommandLineRunner commandLineRunner(AuthenticationService service) {
//        return args -> {
//            Role adminRole = roleRepository.findByRole_name("ADMIN");
//
//            var admin = RegisterRequest.builder()
//                    .first_name("Alistair")
//                    .last_name("Ross")
//                    .email("ali@gmail.com")
//                    .password("1234")
//                    .role(adminRole)
//                    .build();
//
//            System.out.println("Admin token: " + service.register(admin).getAccessToken());
//        };
//    }
}

