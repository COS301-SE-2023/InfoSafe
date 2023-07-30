package com.fragile.infosafe.service;

import com.fragile.infosafe.model.User;
import com.fragile.infosafe.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository repository;
    public List<User> getAllUsers() {return repository.findAll();}
    public Optional<User> getUser(Integer user_id) {return repository.findById(user_id);}
    public User updateUser(User user) {return repository.save(user);}
}
