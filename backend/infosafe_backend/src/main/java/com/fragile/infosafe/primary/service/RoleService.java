package com.fragile.infosafe.primary.service;

import com.fragile.infosafe.primary.model.Permission;
import com.fragile.infosafe.primary.model.Role;
import com.fragile.infosafe.primary.model.RolePermissionDto;
import com.fragile.infosafe.primary.repository.RoleRepository;
import com.fragile.infosafe.primary.requests.RoleRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoleService {
    private final RoleRepository repository;

    public ResponseEntity<String> makeRole(RoleRequest request) {
        var role = Role.builder()
                .role_name(request.getRole_name())
                .permissions(request.getPermissions())
                .build();
        repository.save(role);
        return ResponseEntity.status(HttpStatus.OK).body("added");
    }

    public List<String> getRoleNames() {
        List<Role> roles = repository.findAll();
        return roles.stream()
                .map(Role::getRole_name)
                .collect(Collectors.toList());
    }

    public boolean checkRoleExists(String name) {
        return repository.existsByRole_name(name);
    }

    public Role updateRole(Role role) {
        return repository.save(role);
    }


    public List<RolePermissionDto> getAllRolesWithPermissions() {
        List<Role> roles = repository.findAll();
        return roles.stream()
                .map(this::mapToRolePermissionDto)
                .collect(Collectors.toList());
    }
    private RolePermissionDto mapToRolePermissionDto(Role role) {
        RolePermissionDto dto = new RolePermissionDto();
        dto.setRoleName(role.getRole_name());
        List<String> permissionNames = mapPermissionEnumToString(role.getPermissions());
        dto.setPermissions(permissionNames);
        return dto;
    }
    private List<String> mapPermissionEnumToString(long permissions) {
        List<String> permissionNames = new ArrayList<>();
        for (Permission permission : Permission.values()) {
            if ((permissions & permission.getMask()) != 0) {
                permissionNames.add(permission.name());
            }
        }
        return permissionNames;
    }
}
