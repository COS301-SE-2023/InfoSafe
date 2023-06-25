package com.example.infosafe_backend.service;

import com.example.infosafe_backend.model.User;

import java.util.List;

public interface UserService {
    public User saveUser(User user);
    public List<User> getAllUsers();
}
