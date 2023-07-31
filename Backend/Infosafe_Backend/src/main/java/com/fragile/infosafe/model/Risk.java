package com.fragile.infosafe.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="risks")
public class Risk {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long risk_id;
    private int impact_rating;
    private int probability_rating;
    private String risk_description;
    private String suggested_mitigation;
    private String risk_status;

    public Long getRisk_id() { return risk_id; }

    public void setRisk_id(Long risk_id) { this.risk_id = risk_id; }

    public int getImpact_rating() { return impact_rating; }

    public void setImpact_rating(int impact_rating) { this.impact_rating = impact_rating; }

    public int getProbability_rating() { return probability_rating; }

    public void setProbability_rating(int probability_rating) { this.probability_rating = probability_rating; }

    public String getRisk_description() { return risk_description; }

    public void setRisk_description(String risk_description) { this.risk_description = risk_description; }

    public String getSuggested_mitigation() { return suggested_mitigation; }

    public void setSuggested_mitigation(String suggested_mitigation) { this.suggested_mitigation = suggested_mitigation; }

    public String getRisk_status() { return risk_status; }

    public void setRisk_status(String risk_status) { this.risk_status = risk_status; }
}
