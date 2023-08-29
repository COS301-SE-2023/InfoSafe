package com.fragile.infosafe.repository;

import com.fragile.infosafe.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    @Query("SELECT r FROM Role r WHERE r.role_name = :role_name")
    Role findByRole_name(@Param("role_name") String role_name);

    @Query("SELECT CASE WHEN COUNT(role) > 0 THEN true ELSE false END FROM Role role WHERE role.role_name = :name")
    boolean existsByRole_name(String name);
}

