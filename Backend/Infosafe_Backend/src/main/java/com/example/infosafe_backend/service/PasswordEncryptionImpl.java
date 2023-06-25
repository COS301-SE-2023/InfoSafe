package com.example.infosafe_backend.service;

import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import java.io.UnsupportedEncodingException;
import java.security.GeneralSecurityException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;

@Component
public class PasswordEncryptionImpl implements PasswordEncryption{
    @Override
    public String encryptPassword(String password) throws GeneralSecurityException, UnsupportedEncodingException {

        byte[] salt = new String("175927404").getBytes();
        int iterations = 18000;
        int keyLength = 128;
        char[] charPassword = password.toCharArray();

        SecretKeyMaker secretKeyMaker = new SecretKeyMakerImpl();
        SecretKeySpec secretKey = secretKeyMaker.generateSecretKey(charPassword, salt, iterations, keyLength);

        String encryptedPassword = secretKeyMaker.encrypt(password, secretKey);

        return encryptedPassword;
    }
}


