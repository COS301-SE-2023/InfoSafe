package com.fragile.infosafe.primary.controller;

import com.fragile.infosafe.primary.auth.AuthenticationResponse;
import com.fragile.infosafe.primary.auth.AuthenticationService;
import com.fragile.infosafe.primary.model.Role;
import com.fragile.infosafe.primary.model.User;
import com.fragile.infosafe.primary.requests.ChangePasswordRequest;
import com.fragile.infosafe.primary.requests.DeleteRequest;
import com.fragile.infosafe.primary.requests.RegisterRequest;
import com.fragile.infosafe.primary.service.DeleteService;
import com.fragile.infosafe.primary.service.EmailService;
import com.fragile.infosafe.primary.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("api/user")
@RequiredArgsConstructor
@Slf4j
public class UserController {
    private final UserService userService;
    private final AuthenticationService authService;
    private final EmailService emailService;
    private final DeleteService deleteService;


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

        emailService.sendEmail(request.getEmail(), "New User to InfoSafe", "Welcome to InfoSafe, your password is " + "\n" + request.getPassword() + "\n You can change your password by logging in a selecting your profile in the top left corner and follwoing the prompts" + "\nKind regards\nThe InfoSafe Team");
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

    @GetMapping("/getEmail")
    @ResponseBody
    public Map<String, String> getUserEmail(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.getPrincipal() instanceof User authenticatedUser) {
            Map<String, String> response = new HashMap<>();
            response.put("email", authenticatedUser.getEmail());
            return response;
        }
        return Collections.emptyMap();
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

    @PostMapping("/deleteUser")
    public ResponseEntity<Boolean> deleteUser(@RequestBody DeleteRequest deleteRequest){
        try{
            deleteService.deleteUserAndSaveToSecondary(deleteRequest.getEmail());
            return ResponseEntity.ok(true);
        }catch (Exception e) {
            return ResponseEntity.ok(false);
        }
    }

    @PostMapping("/changePassword")
    public ResponseEntity<Boolean> changePassword(@RequestBody ChangePasswordRequest changePasswordRequest) {
        try {
            Optional<User> user = userService.getUserByEmail(changePasswordRequest.getUserEmail());
            log.info("Changing password for user with email: {}", changePasswordRequest.getUserEmail());
            if (user.isPresent()) {
                userService.changePassword(user.get(), changePasswordRequest.getNewPassword());
                return ResponseEntity.ok(true);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(false);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false);
        }
    }
}
