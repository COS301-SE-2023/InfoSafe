package com.fragile.infosafe.primary.service;

import com.fragile.infosafe.primary.exceptions.UserNotFoundException;
import com.fragile.infosafe.primary.model.Role;
import com.fragile.infosafe.primary.model.User;
import com.fragile.infosafe.primary.repository.RoleRepository;
import com.fragile.infosafe.primary.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository repository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;

    public List<User> getAllUsers() {
        return repository.findAll();
    }

    public Optional<User> getUser(Integer user_id) {
        return repository.findById(user_id);
    }

    public User updateUser(User user) {
        user.setRole(roleRepository.findByRole_name(user.getRole().getRole_name()));
        return repository.save(user);
    }

    public Optional<User> getUserByEmail(String email) {
        return repository.findByEmail(email);
    }


    public void changePassword(User user, String newPassword) {
        user.setPassword(passwordEncoder.encode(newPassword));
        repository.save(user);
    }

    public void assignRoleToUser(int userId, Role role) {
        User user = repository.findById(userId).orElseThrow(() -> new UserNotFoundException("User not found"));
        user.setRole(role);
        repository.save(user);
    }

    public boolean checkEmailExists(String email) {
        return repository.existsByEmail(email);
    }

    public void resetPassword(String email, String newPassword) {
        Optional<User> userOptional = repository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setPassword(passwordEncoder.encode(newPassword));
            user.setOtp(null);
            repository.save(user);
        } else {
            throw new UserNotFoundException("User not found for email: " + email);
        }
    }

    public void generateAndSaveOtp(String email) {
        Optional<User> userOptional = repository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            String otp = generateRandomOTP();
            user.setOtp(otp);
            repository.save(user);
            emailService.sendEmail(user.getEmail(), "Forgot Password", "Your OTP is:\n" + otp);
        } else {
        }
    }

    private String generateRandomOTP() {
        int min = 10000;
        int max = 99999;
        int random_int = (int) Math.floor(Math.random() * (max - min + 1) + min);
        return Integer.toString(random_int);
    }

    public boolean verifyOTP(String email, String otp) {
        Optional<User> userOptional = repository.findByEmail(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return user.getOtp().equals(otp);
        }
        return false;
    }

    public List<User> findAllUsersNotInTask(int task_id) {
        return repository.findUsersNotInTask(task_id);
    }

    public List<String> findNotDataCustodian(User user){
        return repository.findAllUserNotDataCustodian(user);
    }
}
