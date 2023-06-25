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

        //Set variables
        byte[] salt = new String("enAN?=0+8Pk9").getBytes();
        int iterations = 18000;
        int keyLength = 128;
        char[] charPassword = password.toCharArray();

        //Creates instance of the secret key factory
        SecretKeyMaker secretKeyMaker = new SecretKeyMakerImpl();

        //Creates a secret key using the variables passed in anf the password
        SecretKeySpec secretKey = secretKeyMaker.generateSecretKey(charPassword, salt, iterations, keyLength);

        //creates the encrypted password using the password and the secret key
        String encryptedPassword = secretKeyMaker.encrypt(password, secretKey);

        return encryptedPassword;
    }
}


