package com.fragile.infosafe.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import java.io.UnsupportedEncodingException;
import java.security.GeneralSecurityException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;

@Component
@RequiredArgsConstructor
public class PasswordEncryption{

    public String encryptPassword(String password) throws GeneralSecurityException, UnsupportedEncodingException {

        //Set variables
        byte[] salt = new String("enAN?=0+8Pk9").getBytes();
        int iterations = 18000;
        int keyLength = 128;
        char[] charPassword = password.toCharArray();

        SecretKeyMaker secretKeyMaker = new SecretKeyMakerImpl();

        //Creates a secret key using the variables passed in anf the password
        SecretKeySpec secretKey = secretKeyMaker.generateSecretKey(charPassword, salt, iterations, keyLength);

        //creates the encrypted password using the password and the secret key
        String encryptedPassword = secretKeyMaker.encrypt(password, secretKey);

        String p = "";
        for(int i=encryptedPassword.length()-1; i>=0; i--){
            p += encryptedPassword.charAt(i);
        }

        encryptedPassword = p;

        return encryptedPassword;
    }
}