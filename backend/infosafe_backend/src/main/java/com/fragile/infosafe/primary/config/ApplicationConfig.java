package com.fragile.infosafe.primary.config;

import com.fragile.infosafe.primary.repository.UserRepository;
import com.fragile.infosafe.primary.service.AWSSecretService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.codec.Hex;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import java.security.Key;
import java.util.Base64;

@Configuration
@RequiredArgsConstructor
@EnableCaching
@Slf4j
public class ApplicationConfig {
    private final UserRepository repository;
    private final AWSSecretService awsSecretService;
    private String encryptionKeyString;
    private String encryptionIV;
    private String decryptionKeyString;
    private String decryptionIV;
    @Bean
    public UserDetailsService userDetailsService(){
        return username -> repository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    @Bean
    public AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception{
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    @Cacheable(value = {"encryptionKeyString", "encryptionIV"})
    public Cipher encryptionCipher() throws Exception {
        if(encryptionKeyString == null){
            encryptionKeyString  = awsSecretService.getEncryptionKey();
        }
        if(encryptionIV == null){
            encryptionIV = awsSecretService.getIV();
        }
        log.info(encryptionIV);
        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
        byte[] encryptionKeyBytes = Base64.getDecoder().decode(encryptionKeyString);
        Key encryptionKey = new SecretKeySpec(encryptionKeyBytes, "AES");
        byte[] ivBytes = Base64.getDecoder().decode(encryptionIV);
        IvParameterSpec ivSpec = new IvParameterSpec(ivBytes);
        cipher.init(Cipher.ENCRYPT_MODE, encryptionKey, ivSpec);
        return cipher;
    }



    @Bean
    @Cacheable(value = {"decryptionKeyString", "decryptionIV"})
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




}


