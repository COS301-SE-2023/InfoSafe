package com.fragile.infosafe.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="users")
public class User implements UserDetails{

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int user_id;
    private String first_name;
    private String last_name;
    private String email_address;
    private String password;
    @Enumerated(EnumType.STRING)
    private SystemRole system_System_role_id;

    @Override
    public String getUsername() {return email_address;}

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(system_System_role_id.name()));
    }
    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public SystemRole getSystem_System_role_id() {
        return system_System_role_id;
    }

    public void setSystem_System_role_id(SystemRole systemRole) {
        this.system_System_role_id = systemRole;
    }
}

