package com.fragile.infosafe.model;

public enum Permission {
    user_create(1),
    user_edit(2^1),
    user_delete(4),
    data_scope_create(2^3),
    data_scope_edit(2^4),
    data_scope_delete(2^5),
    access_requests_approve(2^6),
    access_requests_edit(2^7),
    tasks_create(2^8),
    tasks_edit(2^9),
    tasks_delete(2^10),
    tasks_approve(2^11),
    devices_create(2^12),
    devices_edit(2^13),
    devices_delete(2^14),
    support_requests_viewAll(2^15),
    support_requests_edit(2^16),
    support_requests_delete(2^17),
    risks_create(2^18),
    risks_edit(2^19),
    risks_review(2^20),
    risks_delete(2^21),
    request_asset(2^22),
    request_support(2^23),
    request_access(2^24),
    asset_request_review(2^25),
    role_creation(2^26);

    private final int mask;
    Permission(int mask) {
        this.mask = mask;
    }
    public int getMask() {
        return mask;
    }
}
