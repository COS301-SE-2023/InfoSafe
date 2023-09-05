package com.fragile.infosafe.model_primary;

import jakarta.persistence.*;
import lombok.*;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="roles")
public class Role{
    @Id
    private String role_name;
    @Column(name = "permissions")
    private long permissions;

    public String getRole_name() {
        return role_name;
    }

    public void setRole_Name(String role_name) {
        this.role_name = role_name;
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