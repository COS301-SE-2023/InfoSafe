package com.fragile.infosafe.controllers;

import com.fragile.infosafe.auth.AuthenticationRequest;
import com.fragile.infosafe.auth.AuthenticationResponse;
import com.fragile.infosafe.auth.AuthenticationService;
import com.fragile.infosafe.config.JwtService;
import com.fragile.infosafe.controller.AuthenticationController;
import com.fragile.infosafe.model.Role;
import com.fragile.infosafe.model.User;
import com.fragile.infosafe.repository.UserRepository;
import com.fragile.infosafe.requests.RegisterRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.security.AuthProvider;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
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
        request.setFirstname("John");
        request.setLastname("Doe");
        request.setEmail("johndoe@example.com");
        request.setPassword("password123");
        request.setRole(Role.ADMIN);


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

