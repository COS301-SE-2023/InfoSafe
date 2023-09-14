package com.fragile.infosafe.controller;

import com.fragile.infosafe.model.Permission;
import com.fragile.infosafe.model.Role;
import com.fragile.infosafe.model.User;
import com.fragile.infosafe.requests.RoleRequest;
import com.fragile.infosafe.requests.TaskRequest;
import com.fragile.infosafe.service.RoleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
            long userPermissions = authenticatedUser.getRole().getPermissions();
            List<String> userPermissionList = new ArrayList<>();

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
