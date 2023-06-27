package com.example.infosafe_backend.controller;

import com.example.infosafe_backend.service.PasswordEncryptionImpl;
import com.example.infosafe_backend.service.RandomPasswordGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.security.GeneralSecurityException;
import java.util.*;

@RestController
@RequestMapping("/password")
@CrossOrigin
public class PasswordController {

    @Autowired
    private RandomPasswordGenerator randomPasswordGenerator;

    @GetMapping("/generate")
    public ResponseEntity<Map<String, String>> generate() throws GeneralSecurityException, UnsupportedEncodingException {
        String randomPassword = randomPasswordGenerator.generateRandomPassword();

        PasswordEncryptionImpl passwordEncryption = new PasswordEncryptionImpl();
        String random = passwordEncryption.encryptPassword(randomPassword);

        Map<String, String> response = new HashMap<>();
        response.put("message", random);
        response.put("password", randomPassword);

        return ResponseEntity.ok(response);
    }
}
