package com.fragile.infosafe.requests;

import com.fragile.infosafe.model.SystemRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserRequest {
    private String first_name;
    private String last_name;
    private String email;
    private String password;
    private SystemRole system_role_id;
}
