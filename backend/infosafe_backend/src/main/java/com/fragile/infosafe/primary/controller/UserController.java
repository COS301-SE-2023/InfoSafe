package com.fragile.infosafe.primary.controller;

import com.fragile.infosafe.primary.auth.AuthenticationResponse;
import com.fragile.infosafe.primary.auth.AuthenticationService;
import com.fragile.infosafe.primary.model.Asset;
import com.fragile.infosafe.primary.model.Role;
import com.fragile.infosafe.primary.model.Task;
import com.fragile.infosafe.primary.model.User;
import com.fragile.infosafe.primary.repository.UserRepository;
import com.fragile.infosafe.primary.requests.ChangePasswordRequest;
import com.fragile.infosafe.primary.requests.DeleteRequest;
import com.fragile.infosafe.primary.requests.RegisterRequest;
import com.fragile.infosafe.primary.service.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.persistence.criteria.CriteriaBuilder;
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
    private final TaskService taskService;
    private final AssetService assetService;

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

        return -1;
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

    @GetMapping("/taskCount")
    public ResponseEntity<Integer> countTasksForUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof User authenticatedUser) {
            int taskCount = taskService.countTasksForUser(authenticatedUser);
            return ResponseEntity.ok(taskCount);
        }else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/getAllTasks")
    public ResponseEntity<List<Task>> getAllTasksOfUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof User authenticatedUser) {
            List<Task> tasks = taskService.getTasksAssociatedWithUser(authenticatedUser);
            return ResponseEntity.ok(tasks);
        }else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/dataScopeCount")
    public ResponseEntity<Integer> countDataScopesForUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof User authenticatedUser) {
            int datascopeCount = taskService.countDataScopesForUser(authenticatedUser);
            return ResponseEntity.ok(datascopeCount);
        }else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/countDevices")
    public ResponseEntity<Long> countDevicesForUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof User authenticatedUser) {
            long count = assetService.getTotalDevicesAssignedToAssignee(authenticatedUser);
            return ResponseEntity.ok(count);
        }else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/getAllDevices")
    public ResponseEntity<List<Asset>> getAllDevicesForUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof User authenticatedUser) {
            List<Asset> count = assetService.getDevicesAssignedToUser(authenticatedUser);
            return ResponseEntity.ok(count);
        }else {
            return ResponseEntity.notFound().build();
        }
    }
}
