package com.fragile.infosafe.delete.deletemodel;

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
@Table(name="deleted_risks")
public class DeletedRisk {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int risk_id;
    private String risk_name;
    private String impact_rating;
    private String probability_rating;
    private String risk_description;
    private String suggested_mitigation;
    private String risk_status;
    private int dataScope_id;
}
