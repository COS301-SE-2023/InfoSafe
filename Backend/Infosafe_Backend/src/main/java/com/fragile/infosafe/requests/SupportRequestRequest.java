package com.fragile.infosafe.requests;

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
    private int user_id;
    private String support_type;
    private String support_description;
    private String support_status;
    private int asset_id;
}
