package com.fragile.infosafe.primary.auth;

import com.fragile.infosafe.primary.model.User;
import com.fragile.infosafe.primary.repository.RoleRepository;
import com.fragile.infosafe.primary.repository.UserRepository;
import com.fragile.infosafe.primary.requests.RegisterRequest;
import com.fragile.infosafe.primary.config.JwtService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fragile.infosafe.primary.service.EncryptionService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.core.AuthenticationException;
import javax.crypto.Cipher;
import org.springframework.security.crypto.codec.Hex;

import java.io.IOException;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthenticationService {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final RoleRepository roleRepository;
    private final EncryptionService encryptionService;

    public AuthenticationResponse register(RegisterRequest request) {
        var user = User.builder()
                .first_name(encryptionService.encryptString(request.getFirst_name()))
                .last_name(encryptionService.encryptString(request.getLast_name()))
                .email(encryptionService.encryptString(request.getEmail()))
                .password(passwordEncoder.encode(request.getPassword()))
                .role(roleRepository.findByRole_name(request.getRole().getRole_name()))
                .build();

        repository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .build();
    }
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            encryptionService.encryptString(request.getEmail()),
                            request.getPassword()
                    )
            );
            var user = repository.findByEmail(encryptionService.encryptString(request.getEmail()))
                    .orElseThrow();
            log.info(String.valueOf(user));
            var jwtToken = jwtService.generateToken(user);

            return AuthenticationResponse.builder()
                    .accessToken(jwtToken)
                    .build();
        } catch (AuthenticationException e) {
            AuthenticationResponse auth = new AuthenticationResponse();
            auth.setError();
            return auth;
        }
    }
}
