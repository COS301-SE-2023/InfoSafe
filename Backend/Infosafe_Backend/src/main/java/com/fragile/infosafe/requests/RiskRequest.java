package com.fragile.infosafe.requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RiskRequest {
    private int ds_id;
    private int impact_rating;
    private String risk_description;
    private String suggested_mitigation;
    private String risk_status;
}
