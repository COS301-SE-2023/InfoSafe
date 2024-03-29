package com.fragile.infosafe.primary.controller;

import com.fragile.infosafe.primary.model.Permission;
import com.fragile.infosafe.primary.model.Role;
import com.fragile.infosafe.primary.model.User;
import com.fragile.infosafe.primary.requests.RoleRequest;
import com.fragile.infosafe.primary.service.RoleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("api/role")
@RequiredArgsConstructor
public class RoleController {
    private final RoleService service;

    @GetMapping("/getPermissions")
    public List<String> getUserPermissions() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof User authenticatedUser) {
            List<String> userPermissionList  = new ArrayList<>();
            long userPermissions = authenticatedUser.getRole().getPermissions();
            for (Permission permission : Permission.values()) {
                if ((userPermissions & permission.getMask()) != 0) {
                    userPermissionList.add(permission.name());
                }
            }
            return userPermissionList;
        }
        return Collections.emptyList();
    }


    @GetMapping("/getRoleNames")
    public List<String> getRoleNames() {
        return service.getRoleNames();
    }

    @PostMapping("/addRole")
    public ResponseEntity addTask(@RequestBody RoleRequest role) {
        log.info("Adding a task");
        return ResponseEntity.ok(service.makeRole(role));
    }

    @GetMapping("/checkName")
    public ResponseEntity<Boolean> checkEmailExists(@RequestParam("rolename") String name) {
        boolean nameExists = service.checkRoleExists(name);
        return ResponseEntity.ok(nameExists);
    }
}
