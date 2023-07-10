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
    private String assetName;
    private String assetDescription;
    private String status;
    private String dateAcquired;
    private String assignee;
}
