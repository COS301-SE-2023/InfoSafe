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
    private int serial_number;
    private int type_id;
    private String asset_description;
    private String clean_status;
    private Boolean availability;
    private Boolean new_device;
}
