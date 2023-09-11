package com.fragile.infosafe.service;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    public void sendEmail(String to, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("New user to InfoSafe");
        message.setText("Welcome to InfoSafe, your password is " + "\n" + body + "\n You can change your password by logging in a selecting your profile in the top left corner and follwoing the prompts" + "\nKind regards\nThe InfoSafe Team");
        mailSender.send(message);
    }
}

