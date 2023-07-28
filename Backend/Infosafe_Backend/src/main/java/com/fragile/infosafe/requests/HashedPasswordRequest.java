package com.fragile.infosafe.requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class HashedPasswordRequest {
    private int user_id;
    private String hashed_password;
}
