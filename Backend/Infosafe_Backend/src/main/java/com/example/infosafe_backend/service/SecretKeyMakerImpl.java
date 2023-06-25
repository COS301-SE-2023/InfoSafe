package com.example.infosafe_backend.service;

import javax.crypto.*;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.SecretKeySpec;
import java.io.UnsupportedEncodingException;
import java.security.AlgorithmParameters;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.InvalidParameterSpecException;
import java.util.Base64;

public class SecretKeyMakerImpl implements SecretKeyMaker{
    @Override
    public SecretKeySpec generateSecretKey(char[] password, byte[] salt, int iterations, int keyLength) throws NoSuchAlgorithmException, InvalidKeySpecException {

        SecretKeyFactory keyFactory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA512");

        PBEKeySpec keySpec = new PBEKeySpec(password, salt, iterations,keyLength);

        SecretKey tempKey = keyFactory.generateSecret(keySpec);

        SecretKeySpec secretKeySpec = new SecretKeySpec(tempKey.getEncoded(), "AES");

        return secretKeySpec;
    }


    @Override
    public String encrypt(String dataToEncrypt, SecretKeySpec key) throws NoSuchPaddingException, NoSuchAlgorithmException, InvalidParameterSpecException, UnsupportedEncodingException, IllegalBlockSizeException, BadPaddingException, InvalidKeyException {

        Cipher pbeCipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
        pbeCipher.init(Cipher.ENCRYPT_MODE, key);

        AlgorithmParameters parameters = pbeCipher.getParameters();

        IvParameterSpec ivParameterSpec = parameters.getParameterSpec(IvParameterSpec.class);

        byte[] cryptoText = pbeCipher.doFinal(dataToEncrypt.getBytes("UTF-8"));

        byte[] iv = ivParameterSpec.getIV();

        String encryptedData = base64Encoder(iv) + ":" +base64Encoder(cryptoText);

        return encryptedData;
    }

    @Override
    public String base64Encoder(byte[] bytes) {

        String encoder = Base64.getEncoder().encodeToString(bytes);

        return encoder;
    }
}
