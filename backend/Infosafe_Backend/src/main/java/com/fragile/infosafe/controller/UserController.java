package com.fragile.infosafe.controller;

import com.fragile.infosafe.auth.AuthenticationResponse;
import com.fragile.infosafe.auth.AuthenticationService;
import com.fragile.infosafe.model_primary.Role;
import com.fragile.infosafe.model_primary.User;
import com.fragile.infosafe.requests.RegisterRequest;
import com.fragile.infosafe.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final AuthenticationService authService;

    @GetMapping("/getAll")
    public List<User> userlist() { return userService.getAllUsers(); }

    @GetMapping("/getUser/{id}")
    public Optional<User> getUser(@PathVariable("id") int user_id, @RequestBody User user) {
        return userService.getUser(user_id);
    }

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

        if (authentication != null && authentication.getPrincipal() instanceof User authenticatedUser) {
            return authenticatedUser.getUser_id();
        }

        return -1; // Or any other value indicating that the user ID couldn't be retrieved.
    }

    @GetMapping("/getRole")
    public Role getCurrentUserRole(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.getPrincipal() instanceof User authenticatedUser) {
            return authenticatedUser.getRole();
        }
        return null;
    }

    @GetMapping("/getUserName")
    public ResponseEntity<String> getCurrentUserName(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.getPrincipal() instanceof User authenticatedUser) {
            String userName = authenticatedUser.getFirst_name() + " " + authenticatedUser.getLast_name();
            return ResponseEntity.ok("{\"username\": \"" + userName + "\"}");
        }
        return null;
    }

    @GetMapping("/checkEmail")
    public ResponseEntity<Boolean> checkEmailExists(@RequestParam("email") String email) {
        boolean emailExists = userService.checkEmailExists(email);
        return ResponseEntity.ok(emailExists);
    }
}
