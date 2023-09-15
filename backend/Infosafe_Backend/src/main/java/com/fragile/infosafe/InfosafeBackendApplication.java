package com.fragile.infosafe;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;


@SpringBootApplication
// @EntityScan(basePackages = {"com.fragile.infosafe.delete.deletemodel", "com.fragile.infosafe.primary.model"})
public class InfosafeBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(InfosafeBackendApplication.class, args);
    }


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

