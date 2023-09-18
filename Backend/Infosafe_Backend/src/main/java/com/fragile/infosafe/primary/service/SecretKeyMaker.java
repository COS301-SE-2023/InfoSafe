package com.fragile.infosafe.primary.service;

import lombok.RequiredArgsConstructor;

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

@RequiredArgsConstructor
public class SecretKeyMaker{
    public SecretKeySpec generateSecretKey(char[] password, byte[] salt, int iterations, int keyLength) throws NoSuchAlgorithmException, InvalidKeySpecException {

        //Secret key factory
        SecretKeyFactory keyFactory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256"); //Returns a Secret Key Factory object that converts secret keys of the specified algorithm, in this case we use PBKDF2(Password-based key derivation function 2) and the hash function HMAC-SHA512

        //Password based key specification
        PBEKeySpec keySpec = new PBEKeySpec(password, salt, iterations,keyLength); //Returns a new key specification based on the password, salt, number of iterations and key length provided

        //Temporary secret key generation
        SecretKey tempKey = keyFactory.generateSecret(keySpec); //Uses the defined key specifications to generate a temporary key from the key factory

        //Temporary key encoding
        SecretKeySpec secretKeySpec = new SecretKeySpec(tempKey.getEncoded(), "AES"); //Temporary key is encoded to byte representation and then the final key spec is created using AES (Advanced encryption standard)

        return secretKeySpec;
    }


    public String encrypt(String dataToEncrypt, SecretKeySpec key) throws NoSuchPaddingException, NoSuchAlgorithmException, InvalidParameterSpecException, UnsupportedEncodingException, IllegalBlockSizeException, BadPaddingException, InvalidKeyException {

        //Creates a cipher
        Cipher pbeCipher = Cipher.getInstance("AES/CBC/PKCS5Padding"); //Creates a cipher using AES for encryption, CBC(cipher block chaining) mode is used for encryption process and PKCS5Padding is used to pad input data

        //Initializes cipher encryption
        pbeCipher.init(Cipher.ENCRYPT_MODE, key); //use the key as parameter for symmetric encryption

        //Gets algorithm parameters
        AlgorithmParameters parameters = pbeCipher.getParameters(); //retrieves the encryption mode and the initialization vector

        //Cast to initialization vector
        IvParameterSpec ivParameterSpec = parameters.getParameterSpec(IvParameterSpec.class);

        //encrypts the data and stored in byte array
        byte[] cryptoText = pbeCipher.doFinal(dataToEncrypt.getBytes("UTF-8"));

        //initialization vector is extracted and stored
        byte[] iv = ivParameterSpec.getIV();

        //encrypted data and initialization vector are combined to a string
        String encryptedData = base64Encoder(iv) + ":" +base64Encoder(cryptoText);

        return encryptedData;
    }

    public String base64Encoder(byte[] bytes) {

        //Creates a Base64 encoder to encode data to Base 64 format and creates a string
        String encoder = Base64.getEncoder().encodeToString(bytes);

        return encoder;
    }
}
