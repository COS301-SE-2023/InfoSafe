package com.fragile.infosafe.primary.requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RiskRequest {
    private String impact_rating;
    private String probability_rating;
    private String risk_description;
    private String suggested_mitigation;
    private String risk_status;
    private int dataScope_id;
}
