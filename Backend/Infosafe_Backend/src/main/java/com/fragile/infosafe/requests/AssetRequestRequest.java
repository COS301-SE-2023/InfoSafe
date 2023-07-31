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
public class AssetRequestRequest {
    private int asset_request_id;
    private int user_id;
    private int asset_id;
    private String reason;
    private Date desired_date;
    private String request_status;
}
