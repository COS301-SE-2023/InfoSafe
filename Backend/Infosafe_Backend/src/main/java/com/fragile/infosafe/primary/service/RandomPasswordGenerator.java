package com.fragile.infosafe.primary.service;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
@RequiredArgsConstructor
public class RandomPasswordGenerator {
    @Bean
    public String generateRandomPassword() {

        Random rnd = new Random();
        String letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        String numbers = "0123456789";
        String specials = "=+-?@#$%^&*!_<>|";
        ArrayList<Character> list = new ArrayList<>();

        // Increase loop iterations to 12
        for (int i = 0; i < 12; i++) {
            list.add(letters.charAt(rnd.nextInt(letters.length())));
            list.add(Character.toLowerCase(letters.charAt(rnd.nextInt(letters.length()))));
            list.add(numbers.charAt(rnd.nextInt(numbers.length())));
            list.add(specials.charAt(rnd.nextInt(specials.length())));
        }

        String password = "";
        for (int i = 0; i < 12; i++) {
            password += list.remove(rnd.nextInt(list.size()));
        }

        return password;
    }
}
