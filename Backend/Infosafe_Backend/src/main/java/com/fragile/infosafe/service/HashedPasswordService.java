package com.fragile.infosafe.service;

import com.fragile.infosafe.model.HashedPassword;
import com.fragile.infosafe.repository.HasedPasswordRepository;
import com.fragile.infosafe.requests.HashedPasswordRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.fragile.infosafe.model.User;

@Service
@RequiredArgsConstructor
public class HashedPasswordService {

    private final HasedPasswordRepository hpwRepository;
    //private final User user;
    //int id = user.getUser_id();

    public String getHashedPassword(int id) {
        String pw = "";
        return pw;
    }

    public ResponseEntity<String> makeHashedPassword(HashedPasswordRequest request){
        var hashedPassword = HashedPassword.builder()
                .user_id(request.getUser_id())
                .hashed_password(request.getHashed_password())
                .build();
        hpwRepository.save(hashedPassword);
        return ResponseEntity.status(HttpStatus.OK).body("Password Saved");
    }
}
