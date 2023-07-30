package com.fragile.infosafe.controller;

import com.fragile.infosafe.service.PasswordEncryption;
import com.fragile.infosafe.service.RandomPasswordGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.UnsupportedEncodingException;
import java.security.GeneralSecurityException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("api/randPass")
@RequiredArgsConstructor
public class RandomPasswordController {

    private RandomPasswordGenerator randomPasswordGenerator;

    @GetMapping("/generate")
    public ResponseEntity<Map<String, String>> generate() throws GeneralSecurityException, UnsupportedEncodingException {
        String randomPassword = randomPasswordGenerator.generateRandomPassword();

        PasswordEncryption passwordEncryption = new PasswordEncryption();
        String random = passwordEncryption.encryptPassword(randomPassword);

        Map<String, String> response = new HashMap<>();
        response.put("message", random);
        response.put("password", randomPassword);

        return ResponseEntity.ok(response);
    }
}
