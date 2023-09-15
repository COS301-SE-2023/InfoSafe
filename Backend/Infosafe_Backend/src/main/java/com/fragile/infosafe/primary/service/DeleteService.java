package com.fragile.infosafe.primary.service;


import com.fragile.infosafe.delete.DeleteRepository.DeletedUserRepository;
import com.fragile.infosafe.delete.DeletedModels.DeletedUser;
import com.fragile.infosafe.primary.model.User;
import com.fragile.infosafe.primary.repository.UserRepository;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DeleteService {

    private final UserRepository userRepository;

    private final DeletedUserRepository deletedUserRepository;

    @Transactional
    public void deleteAndSaveToSecondary(String email) {
        Optional<User> entityOptional = userRepository.findByEmail(email);
        if (entityOptional.isPresent()) {
            User entityToDelete = entityOptional.get();
            DeletedUser secondaryEntity = new DeletedUser();

            deletedUserRepository.save(secondaryEntity);
            userRepository.delete(entityToDelete);
        }
    }
}

