package com.fragile.infosafe.primary.controller;

import com.fragile.infosafe.primary.requests.PasswordResetRequest;
import com.fragile.infosafe.primary.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/forgot")
@RequiredArgsConstructor
public class ForgotPasswordController {
    private final UserService userService;

    @PostMapping("/request-reset")
    public ResponseEntity<String> requestPasswordReset(@RequestBody PasswordResetRequest request) {
        try {
            if (userService.checkEmailExists(request.getEmail())){
                userService.generateAndSaveOtp(request.getEmail());
                return ResponseEntity.ok("Password reset instructions sent to your email.");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred.");
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody PasswordResetRequest request) {
        try {
            if (userService.verifyOTP(request.getEmail(), request.getOtp())) {
                userService.resetPassword(request.getEmail(), request.getNewPassword());
                return ResponseEntity.ok("Password reset successfully.");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid OTP.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred.");
        }
    }

    //    @PostMapping("/verify-otp")
    //    public ResponseEntity<String> verifyOTP(@RequestBody PasswordResetRequest request) {
//        try {
//            if (userService.verifyOTP(request.getEmail(), request.getOtp())) {
//                return ResponseEntity.ok("OTP is valid.");
//            } else {
//                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid OTP.");
//            }
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred.");
//        }
//    }
}
