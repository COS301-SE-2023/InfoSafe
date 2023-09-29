package com.fragile.infosafe.primary.requests;

import com.fragile.infosafe.primary.model.DataScope;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReviewRiskRequest {
    private int risk_id;
    private String risk_status;
    private String risk_name;
    private int ds_id;
}
