package com.fragile.infosafe.primary.service;

import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.codec.Hex;
import org.springframework.stereotype.Service;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.util.Base64;

@Service
@RequiredArgsConstructor
public class EncryptionService {
    private final AWSSecretService awsSecretService;
    private String encryptionKeyString;
    private String encryptionIV;
    private String decryptionKeyString;
    private String decryptionIV;

    @Cacheable(value = {"encryptionKeyString", "encryptionIV"})
    public Cipher encryptionCipher() throws Exception {
        if(encryptionKeyString == null){
            encryptionKeyString  = awsSecretService.getEncryptionKey();
        }
        if(encryptionIV == null){
            encryptionIV = awsSecretService.getIV();
        }
        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
        byte[] encryptionKeyBytes = Base64.getDecoder().decode(encryptionKeyString);
        Key encryptionKey = new SecretKeySpec(encryptionKeyBytes, "AES");
        byte[] ivBytes = Base64.getDecoder().decode(encryptionIV);
        IvParameterSpec ivSpec = new IvParameterSpec(ivBytes);
        cipher.init(Cipher.ENCRYPT_MODE, encryptionKey, ivSpec);
        return cipher;
    }


    @Cacheable(value = {"decryptionKeyString", "encryptionIV"})
    public Cipher decryptionCipher() throws Exception {
        if(decryptionKeyString == null){
            decryptionKeyString  = awsSecretService.getEncryptionKey();
        }
        if(decryptionIV == null){
            decryptionIV = awsSecretService.getIV();
        }

        byte[] encryptionKeyBytes = Base64.getDecoder().decode(decryptionKeyString);
        Key encryptionKey = new SecretKeySpec(encryptionKeyBytes, "AES");
        byte[] ivBytes = Base64.getDecoder().decode(decryptionIV);

        IvParameterSpec ivSpec = new IvParameterSpec(ivBytes);
        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
        cipher.init(Cipher.DECRYPT_MODE, encryptionKey, ivSpec);
        return cipher;
    }

    public String encryptString(String input) {
        try {
            byte[] inputBytes = input.getBytes("UTF-8");
            byte[] encryptedBytes = encryptionCipher().doFinal(inputBytes);
            return new String(Hex.encode(encryptedBytes));
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    public String decryptString(String encryptedHex) {
        try {
            byte[] encryptedBytes = Hex.decode(encryptedHex);
            byte[] decryptedBytes = decryptionCipher().doFinal(encryptedBytes);
            return new String(decryptedBytes, "UTF-8");
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
