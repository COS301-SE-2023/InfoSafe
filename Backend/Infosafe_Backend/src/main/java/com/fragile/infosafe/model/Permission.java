package com.fragile.infosafe.model;

public enum Permission {
    user_create(1),
    user_edit(2),
    user_delete(4),
    data_scope_create(8),
    data_scope_edit(16),
    data_scope_delete(32),
    access_requests_approve(64),
    access_requests_edit(128),
    tasks_create(256),
    tasks_edit(512),
    tasks_delete(1024),
    tasks_approve(2048),
    devices_create(4096),
    devices_edit(8192),
    devices_delete(16384),
    support_requests_viewAll(32768),
    support_requests_edit(65536),
    support_requests_delete(131072),
    risks_create(262144),
    risks_edit(524288),
    risks_review(1048576),
    risks_delete(2097152),
    request_asset(4194304),
    request_support(8388608),
    request_access(16777216),
    asset_request_review(33554432);

    private final int mask;
    Permission(int mask) {
        this.mask = mask;
    }
    public int getMask() {
        return mask;
    }
}
