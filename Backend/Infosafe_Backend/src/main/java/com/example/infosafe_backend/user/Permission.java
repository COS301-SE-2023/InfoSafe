package com.example.infosafe_backend.user;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum Permission {
    ADMIN_READ("admin:read"),
    ADMIN_UPDATE("admin:update"),
    ADMIN_CREATE("admin:create"),
    ADMIN_DELETE("admin:delete"),
    ISO_READ("management:read"),
    ISO_UPDATE("management:update"),
    ISO_CREATE("management:create"),
    ISO_DELETE("management:delete"),
    DISO_READ("admin:read"),
    DISO_UPDATE("admin:update"),
    DISO_CREATE("admin:create"),
    DISO_DELETE("admin:delete"),
    USERs_READ("admin:read");

    @Getter
    private final String permission;
}
