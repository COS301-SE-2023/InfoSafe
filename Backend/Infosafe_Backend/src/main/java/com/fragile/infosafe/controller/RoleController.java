package com.fragile.infosafe.controller;

import com.fragile.infosafe.model.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("api/role")
@RequiredArgsConstructor
public class RoleController {

    @GetMapping("/getPermissions")
    public int getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.getPrincipal() instanceof User authenticatedUser) {
            log.info("Role made");
            return authenticatedUser.getRole().getPermissions();
        }
        return -1;
    }
}
