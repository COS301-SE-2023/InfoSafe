package com.fragile.infosafe.service;

import com.fragile.infosafe.model.User;
import com.fragile.infosafe.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository repository;
    public List<User> getAllUsers() {return repository.findAll();}

    public User updateUser(User user) {return repository.save(user);}
}
