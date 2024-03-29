package com.fragile.infosafe.primary.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import software.amazon.awssdk.services.redshift.model.SupportedPlatform;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="users")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int user_id;
    private String first_name;
    private String last_name;
    @Column(unique = true)
    private String email;
    private String password;

    @Column(nullable = true)
    private String otp;

    @ManyToOne
    @JoinColumn(name = "role_name")
    private Role role;

    @JsonIgnore
    @OneToMany(mappedBy = "current_assignee", fetch = FetchType.LAZY)
    private List<Asset> assets;

    @JsonIgnore
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<AssetRequests> assetRequests;

    @JsonIgnore
    @OneToMany(mappedBy = "user_id", fetch = FetchType.LAZY)
    private List<SupportRequest> supportRequests;

    @JsonIgnore
    @OneToMany(mappedBy = "user_id", fetch = FetchType.LAZY)
    private List<AccessRequest> accessRequests;

    @JsonIgnore
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<Notifications> notifications;

    @JsonIgnore
    @ManyToMany(mappedBy = "users", fetch = FetchType.LAZY)
    private List<Task> tasks;

    @JsonIgnore
    @ManyToMany(mappedBy = "users", fetch = FetchType.LAZY)
    private List<DataScope> dataScopes;

    @Override
    public String toString() {
        return "User{" +
                "user_id=" + user_id +
                ", first_name='" + first_name + '\'' +
                ", last_name='" + last_name + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", otp='" + otp + '\'' +
                ", role=" + (role != null ? role.getRole_name() : "null") +
                '}';
    }

    public int getUser_id() {
        return user_id;
    }

    public void setUser_id(int user_id) {
        this.user_id = user_id;
    }

    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public void setLast_name(String last_name) {
        this.last_name = last_name;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Set<GrantedAuthority> authorities = new HashSet<>();
        authorities.add(new SimpleGrantedAuthority(role.getRole_name())); // should add _ROLE
        for (Permission permission : Permission.values()) {
            if (role.hasPermission(permission)) {
                authorities.add(new SimpleGrantedAuthority(permission.name()));
            }
        }
        return authorities;
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

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}


