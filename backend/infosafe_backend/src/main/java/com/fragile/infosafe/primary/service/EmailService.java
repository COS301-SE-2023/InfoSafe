package com.fragile.infosafe.primary.service;

import com.fragile.infosafe.primary.config.EmailConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    //private final JavaMailSender mailSender;
    EmailConfig emailConfig = new EmailConfig();
    private final JavaMailSender mailSender = emailConfig.javaMailSender();

    public void sendEmail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
    }
}

