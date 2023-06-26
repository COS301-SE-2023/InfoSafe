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
    private String asset_name;
    private String asset_description;
    private String status;
    private String date_acquired;
    private String assignee;
}
