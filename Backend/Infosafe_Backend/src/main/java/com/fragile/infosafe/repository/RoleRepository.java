package com.fragile.infosafe.repository;

import com.fragile.infosafe.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role,Integer> {
    Role findByRoleName(String roleName);
}
