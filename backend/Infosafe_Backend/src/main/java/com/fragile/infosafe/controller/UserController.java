package com.fragile.infosafe.controller;

import com.fragile.infosafe.model.User;
import com.fragile.infosafe.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService service;
    @GetMapping("/getAll")
    public List<User> userlist() { return service.getAllUsers(); }


}
