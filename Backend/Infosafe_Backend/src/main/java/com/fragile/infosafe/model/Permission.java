package com.fragile.infosafe.model;

public enum Permission {
    user_create(1),
    user_edit(1 << 1),
    user_delete(1 << 2),
    data_scope_create(1 << 3),
    data_scope_edit(1 << 4),
    data_scope_delete(1 << 5),
    access_requests_approve(1 << 6),
    access_requests_edit(1 << 7),
    tasks_create(1 << 8),
    tasks_edit(1 << 9),
    tasks_delete(1 << 10),
    tasks_approve(1 << 11),
    devices_create(1 << 12),
    devices_edit(1 << 13),
    devices_delete(1 << 14),
    support_requests_viewAll(1 << 15),
    support_requests_edit(1 << 16),
    support_requests_delete(1 << 17),
    risks_create(1 << 18),
    risks_edit(1 << 19),
    risks_review(1 << 20),
    risks_delete(1 << 21),
    request_asset(1 << 22),
    request_support(1 << 23),
    request_access(1 << 24),
    asset_request_review(1 << 25),
    role_creation(1 << 26);

    private final int mask;

    Permission(int mask) {
        this.mask = mask;
    }

    public int getMask() {
        return mask;
    }
}

