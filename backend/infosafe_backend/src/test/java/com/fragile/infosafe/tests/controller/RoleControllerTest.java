package com.fragile.infosafe.tests.controller;
// Generated by CodiumAI

import com.fragile.infosafe.primary.controller.RoleController;
import com.fragile.infosafe.primary.model.Permission;
import com.fragile.infosafe.primary.model.Role;
import com.fragile.infosafe.primary.model.User;
import com.fragile.infosafe.primary.requests.RoleRequest;
import com.fragile.infosafe.primary.service.RoleService;
import org.junit.Test;
import org.mockito.Mockito;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static org.junit.Assert.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class RoleControllerTest {


    // Can get user permissions
    @Test
    public void test_getUserPermissions() {
        // Mock Authentication
        Authentication authentication = mock(Authentication.class);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Mock User
        User user = mock(User.class);
        Role role = mock(Role.class);
        when(user.getRole()).thenReturn(role);
        when(authentication.getPrincipal()).thenReturn(user);

        // Mock Permissions
        long permissions = 1L << 1;
        when(role.getPermissions()).thenReturn(permissions);

        // Mock Permission values
        Permission[] permissionValues = Permission.values();
        for (Permission permission : permissionValues) {
            when(role.hasPermission(permission)).thenReturn((permissions & permission.getMask()) != 0);
        }

        // Test getUserPermissions method
        RoleService roleService = mock(RoleService.class);
        RoleController roleController = new RoleController(roleService);
        List<String> result = roleController.getUserPermissions();

        // Verify the result
        List<String> expected = new ArrayList<>();
        expected.add(Permission.user_edit.name());
        assertEquals(expected, result);
    }

    // Can get role names
    @Test
    public void test_getRoleNames() {
        // Mock RoleService
        RoleService roleService = mock(RoleService.class);
        List<String> expected = new ArrayList<>();
        expected.add("Role1");
        expected.add("Role2");
        when(roleService.getRoleNames()).thenReturn(expected);

        // Test getRoleNames method
        RoleController roleController = new RoleController(roleService);
        List<String> result = roleController.getRoleNames();

        // Verify the result
        assertEquals(expected, result);
    }


    // Authentication is null
    @Test
    public void test_authenticationIsNull() {
        // Mock SecurityContextHolder
        SecurityContextHolder.getContext().setAuthentication(null);

        // Test getUserPermissions method
        RoleService roleService = mock(RoleService.class);
        RoleController roleController = new RoleController(roleService);
        List<String> result = roleController.getUserPermissions();

        // Verify the result
        List<String> expected = Collections.emptyList();
        assertEquals(expected, result);
    }

    // Authentication principal is not an instance of User
    @Test
    public void test_authenticationPrincipalNotUser() {
        // Mock Authentication
        Authentication authentication = mock(Authentication.class);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Test getUserPermissions method
        RoleService roleService = mock(RoleService.class);
        RoleController roleController = new RoleController(roleService);
        List<String> result = roleController.getUserPermissions();

        // Verify the result
        List<String> expected = Collections.emptyList();
        assertEquals(expected, result);
    }

    // Role name already exists
    @Test
    public void test_checkRoleExists() {
        // Mock RoleService
        RoleService roleService = mock(RoleService.class);
        String roleName = "ExistingRole";
        when(roleService.checkRoleExists(roleName)).thenReturn(true);

        // Test checkEmailExists method
        RoleController roleController = new RoleController(roleService);
        ResponseEntity<Boolean> result = roleController.checkEmailExists(roleName);

        // Verify the result
        ResponseEntity<Boolean> expected = ResponseEntity.ok(true);
        assertEquals(expected, result);
    }

}