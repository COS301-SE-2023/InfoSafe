package com.fragile.infosafe.service;

import com.fragile.infosafe.model_primary.Role;
import com.fragile.infosafe.repository.RoleRepository;
import com.fragile.infosafe.requests.RoleRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RoleService {
    private final RoleRepository repository;

    public ResponseEntity<String> makeRole (RoleRequest request){
        var role = Role.builder()
                .role_name(request.getRole_name())
                .permissions(request.getPermissions())
                .build();
        repository.save(role);
        return ResponseEntity.status(HttpStatus.OK).body("added");
    }

//    public long getRolePermissions(String role_name) throws RoleNotFoundException {
//        Role role = repository.findByRole_name(role_name);
//        if (role != null) {
//            return role.getPermissions();
//        } else {
//            throw new RoleNotFoundException("Role not found: " + role_name);
//        }
//    }

    public List<String> getRoleNames() {
        List<Role> roles = repository.findAll();
        return roles.stream()
                .map(Role::getRole_name)
                .collect(Collectors.toList());
    }
    public boolean checkRoleExists(String name){return repository.existsByRole_name(name);}
}
