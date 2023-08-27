package com.fragile.infosafe.service;

import com.fragile.infosafe.model.Role;
import com.fragile.infosafe.repository.RoleRepository;
import com.fragile.infosafe.requests.RoleRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.management.relation.RoleNotFoundException;

@Service
@RequiredArgsConstructor
public class RoleService {
    private RoleRepository repository;

    public ResponseEntity<String> makeRole (RoleRequest request){
        var role = Role.builder()
                .roleName(request.getRoleName())
                .permissions(request.getPermissions())
                .build();
        repository.save(role);
        return ResponseEntity.status(HttpStatus.OK).body("added");
    }

    public long getRolePermissions(String roleName) throws RoleNotFoundException {
        Role role = repository.findByRoleName(roleName);
        if (role != null) {
            return role.getPermissions();
        } else {
            throw new RoleNotFoundException("Role not found: " + roleName);
        }
    }
}
