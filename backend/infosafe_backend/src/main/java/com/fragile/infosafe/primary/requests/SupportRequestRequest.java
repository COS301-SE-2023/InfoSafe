package com.fragile.infosafe.primary.requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SupportRequestRequest {
    private int support_id;
    private String user_email;
    private String support_type;
    private String support_description;
    private String support_status;
}