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
    private String serialNumber;
    private int typeID;
    private String assetDescription;
    private String cleanStatus;
    private Boolean availability;
    private Boolean newDevice;
}
