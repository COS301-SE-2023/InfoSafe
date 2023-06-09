package com.fragile.infosafe.service;

import java.io.UnsupportedEncodingException;
import java.security.GeneralSecurityException;

public interface PasswordEncryption {
    public String encryptPassword(String password) throws GeneralSecurityException, UnsupportedEncodingException;
}
