package com.fragile.infosafe.primary.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.codec.Hex;
import org.springframework.stereotype.Service;

import javax.crypto.Cipher;

@Service
@RequiredArgsConstructor
public class EncryptionService {
    private final Cipher encryptionCipher;
    private final Cipher decryptionCipher;

    public String encryptString(String input) {
        try {
            byte[] inputBytes = input.getBytes("UTF-8");
            byte[] encryptedBytes = encryptionCipher.doFinal(inputBytes);
            return new String(Hex.encode(encryptedBytes));
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    public String decryptString(String encryptedHex) {
        try {
            byte[] encryptedBytes = Hex.decode(encryptedHex);
            byte[] decryptedBytes = decryptionCipher.doFinal(encryptedBytes);
            return new String(decryptedBytes, "UTF-8");
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
