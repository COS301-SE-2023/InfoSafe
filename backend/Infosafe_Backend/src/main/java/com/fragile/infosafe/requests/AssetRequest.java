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
public class AssetRequest {
    private int asset_id;
    private String asset_name;
    private String asset_description;
    private String status;
    private Boolean availability;
    private String current_assignee;
    private String previous_assignee;
    private String device_type;
}
