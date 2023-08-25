package com.fragile.infosafe.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.authority.SimpleGrantedAuthority;


import javax.persistence.Id;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="roles")
public class Role{

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int role_id;
    private String roleName;
    private int permissions;
    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public int getPermissions() {
        return permissions;
    }

    public void setPermissions(int permissions) {
        this.permissions = permissions;
    }


}