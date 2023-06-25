package com.fragile.infosafe.model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum Permission {
    ADMIN_READ("admin:read"),
    ADMIN_UPDATE("admin:update"),
    ADMIN_CREATE("admin:create"),
    ADMIN_DELETE("admin:delete"),
    ISO_READ("iso:read"),
    ISO_UPDATE("iso:update"),
    ISO_CREATE("iso:create"),
    ISO_DELETE("iso:delete"),
    DISO_READ("diso:read"),
    DISO_UPDATE("diso:update"),
    DISO_CREATE("diso:create"),
    DISO_DELETE("diso:delete"),
    USERs_READ("users:read");

    @Getter
    private final String permission;
}
