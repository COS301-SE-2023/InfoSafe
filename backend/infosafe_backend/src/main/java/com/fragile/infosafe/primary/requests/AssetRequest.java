package com.fragile.infosafe.primary.requests;
import com.fragile.infosafe.primary.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AssetRequest {
    private int asset_id;
    private String asset_name;
    private String asset_description;
    private String status;
    private String availability;
    private String used;
    private String current_assignee;
    private String previous_assignee;
    private String device_type;
}
