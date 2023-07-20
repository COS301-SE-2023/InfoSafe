package com.fragile.infosafe.controller;

import com.fragile.infosafe.model.HashedPassword;
import com.fragile.infosafe.model.User;
import com.fragile.infosafe.requests.HashedPasswordRequest;
import com.fragile.infosafe.service.HashedPasswordService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/password")
@RequiredArgsConstructor
public class HashedPasswordController {

    private final HashedPasswordService passwordService;
    private final User user;

    @PostMapping("/addHashedPW")
    public ResponseEntity addHashPW(@RequestBody HashedPasswordRequest hashPW){
        return ResponseEntity.ok(passwordService.makeHashedPassword(hashPW));
    }

    @GetMapping("/getHashedPW")
    public String getHashedPassword() { return passwordService.getHashedPassword(user.getUser_id()); }
}
