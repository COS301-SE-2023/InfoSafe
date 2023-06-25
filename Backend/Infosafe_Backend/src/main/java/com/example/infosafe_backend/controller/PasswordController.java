package com.example.infosafe_backend.controller;

import com.example.infosafe_backend.service.RandomPasswordGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/password")
@CrossOrigin
public class PasswordController {

    @Autowired
    private RandomPasswordGenerator randomPasswordGenerator;

    @GetMapping("/generate")
    public ResponseEntity<Map<String, String>> generate(){
        String randomPassword = randomPasswordGenerator.generateRandomPassword();

        Map<String, String> response = new HashMap<>();
        response.put("message", randomPassword);

        return ResponseEntity.ok(response);
    }
}
