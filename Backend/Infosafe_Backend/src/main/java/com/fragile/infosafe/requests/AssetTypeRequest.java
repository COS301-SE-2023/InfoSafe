package com.fragile.infosafe.requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AssetTypeRequest {
    private int asset_type_id;
    private String type_name;
}
