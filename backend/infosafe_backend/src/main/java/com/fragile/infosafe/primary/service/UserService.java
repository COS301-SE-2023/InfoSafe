package com.fragile.infosafe.primary.service;

import com.fragile.infosafe.primary.exceptions.UserNotFoundException;
import com.fragile.infosafe.primary.model.Role;
import com.fragile.infosafe.primary.model.User;
import com.fragile.infosafe.primary.repository.RoleRepository;
import com.fragile.infosafe.primary.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.codec.Hex;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.crypto.Cipher;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {
    private final UserRepository repository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final EncryptionService encryptionService;

    public List<User> getAllUsers() {
        List<User> users = repository.findAll();
        for (User user : users) {
            user.setFirst_name(encryptionService.decryptString(user.getFirst_name()));
            user.setLast_name(encryptionService.decryptString(user.getLast_name()));
            user.setEmail(encryptionService.decryptString(user.getEmail()));
        }
        return users;
    }

    public List<String> getAllUsersEmails() {
        List<String> emails = repository.getAllEmails();
        emails.replaceAll(encryptionService::decryptString);
        return emails;
    }

    public User updateUser(User user) {
        user.setRole(roleRepository.findByRole_name(user.getRole().getRole_name()));
        user.setFirst_name(encryptionService.decryptString(user.getFirst_name()));
        user.setLast_name(encryptionService.decryptString(user.getLast_name()));
        user.setEmail(encryptionService.decryptString(user.getEmail()));
        user.setPassword(encryptionService.decryptString(user.getPassword()));
        return repository.save(user);
    }

    public Optional<User> getUserByEmail(String email) {
        return repository.findByEmail(encryptionService.encryptString(email));
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
        return repository.existsByEmail(encryptionService.encryptString(email));
    }

    public void resetPassword(String email, String newPassword) {
        Optional<User> userOptional = repository.findByEmail(encryptionService.encryptString(email));
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
        Optional<User> userOptional = repository.findByEmail(encryptionService.encryptString(email));
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            String otp = generateRandomOTP();
            user.setOtp(otp);
            repository.save(user);
            emailService.sendEmail(email, "Forgot Password", "Your OTP is:\n" + otp);
        }else{
            log.info("Broke here" + email);
        }
    }

    private String generateRandomOTP() {
        int min = 10000;
        int max = 99999;
        int random_int = (int) Math.floor(Math.random() * (max - min + 1) + min);
        return Integer.toString(random_int);
    }

    public boolean verifyOTP(String email, String otp) {
        Optional<User> userOptional = repository.findByEmail(encryptionService.encryptString(email));
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return user.getOtp().equals(otp);
        }
        return false;
    }

    public List<String> findAllUsersNotInTask(int task_id) {
        List<String> userEmails = repository.findUsersNotInTask(task_id);
        userEmails.replaceAll(encryptionService::decryptString);
        return userEmails;
    }

    public List<String> findNotDataCustodian(User user){
        return repository.findAllUserNotDataCustodian(user);
    }
}
