package com.example.infosafe_backend.user;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static com.example.infosafe_backend.user.Permission.*;


@RequiredArgsConstructor
public enum Role {

    USER(Collections.emptySet()),
    ADMIN(
            Set.of(
                    ADMIN_READ,
                    ADMIN_UPDATE,
                    ADMIN_DELETE,
                    ADMIN_CREATE,
                    ISO_READ,
                    ISO_UPDATE,
                    ISO_DELETE,
                    ISO_CREATE
            )
    ),
    ISO(
            Set.of(
                    ISO_READ,
                    ISO_UPDATE,
                    ISO_DELETE,
                    ISO_CREATE
            )
    ),

    DISO(
            Set.of(
                    DISO_READ,
                    DISO_UPDATE,
                    DISO_DELETE,
                    DISO_UPDATE
            )
    ),

    USERs(
        Set.of(
                USERs_READ
        )
    )

    ;

    @Getter
    private final Set<Permission> permissions;

    public List<SimpleGrantedAuthority> getAuthorities() {
        var authorities = getPermissions()
                .stream()
                .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
                .collect(Collectors.toList());
        authorities.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
        return authorities;
    }
}