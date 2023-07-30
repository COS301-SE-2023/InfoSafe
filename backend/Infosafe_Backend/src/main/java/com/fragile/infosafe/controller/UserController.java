package com.fragile.infosafe.controller;

import com.fragile.infosafe.auth.AuthenticationResponse;
import com.fragile.infosafe.auth.AuthenticationService;
import com.fragile.infosafe.model.User;
import com.fragile.infosafe.requests.RegisterRequest;
import com.fragile.infosafe.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final AuthenticationService authService;

    @GetMapping("/getAll")
    public List<User> userlist() { return userService.getAllUsers(); }

    @PostMapping("/add")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PutMapping("/update/{id}")
    public User updateUser (@PathVariable("id") int user_id, @RequestBody User user) {
        user.setUser_id(user_id);
        return userService.updateUser(user);
    }

    @GetMapping("/getId")
    public int getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.getPrincipal() instanceof User) {
            User authenticatedUser = (User) authentication.getPrincipal();
            return authenticatedUser.getUser_id();
        }

        return -1; // Or any other value indicating that the user ID couldn't be retrieved.
    }

}
