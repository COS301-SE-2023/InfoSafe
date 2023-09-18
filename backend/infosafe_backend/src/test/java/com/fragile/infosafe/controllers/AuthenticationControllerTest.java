package com.fragile.infosafe.controllers;

import com.fragile.infosafe.primary.auth.AuthenticationRequest;
import com.fragile.infosafe.primary.auth.AuthenticationResponse;
import com.fragile.infosafe.primary.auth.AuthenticationService;
import com.fragile.infosafe.primary.config.JwtService;
import com.fragile.infosafe.primary.model.User;
import com.fragile.infosafe.primary.repository.UserRepository;
import com.fragile.infosafe.primary.requests.RegisterRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
class AuthenticationServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private JwtService jwtService;

    @Autowired
    private AuthenticationService authenticationService;


    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testRegister() {
        RegisterRequest request = new RegisterRequest();
        request.setFirst_name("John");
        request.setLast_name("Doe");
        request.setEmail("johndoe@example.com");
        request.setPassword("password123");
        // request.setRole();


        User savedUser = new User();
        //when(userRepository.save(any(User.class))).thenReturn(savedUser);

        String mockToken = "mockAccessToken";
        String mockRefreshToken = "mockRefreshToken";

        AuthenticationResponse response = authenticationService.register(request);

        assertNotNull(response.getAccessToken());
        assertNotNull(response.getRefreshToken());
        assertEquals(false, response.getError());
    }

    @Test
    void testLoginFail() {

        AuthenticationRequest request = new AuthenticationRequest();
        request.setEmail("alistairmikeross@gmaill.com");
        request.setPassword("1234");

        AuthenticationResponse responseEntity = authenticationService.authenticate(request);

        assertEquals(true, responseEntity.getError());
        assertNull(responseEntity.getAccessToken());
        assertNull(responseEntity.getRefreshToken());
        //assertEquals(false, responseEntity.getError());
    }
}

