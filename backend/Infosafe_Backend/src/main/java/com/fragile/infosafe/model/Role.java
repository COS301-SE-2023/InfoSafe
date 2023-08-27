package com.fragile.infosafe.model;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.math.BigInteger;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="roles")
public class Role{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int role_id;
    private String roleName;
    @Column(name = "permissions")
    private long permissions;

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public long getPermissions() {
        return permissions;
    }

    public void setPermissions(long permissions) {
        this.permissions = permissions;
    }

    public boolean hasPermission(Permission permission) {
        return (permissions & permission.getMask()) != 0;
    }

    public void grantPermission(Permission permission) {
        permissions |= permission.getMask();
    }

    public void revokePermission(Permission permission) {
        permissions &= ~permission.getMask();
    }
}