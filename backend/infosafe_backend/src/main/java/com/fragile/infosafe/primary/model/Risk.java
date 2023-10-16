package com.fragile.infosafe.primary.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
    private int risk_id;
    private String risk_name;
    private String impact_rating;
    private String probability_rating;
    private String risk_description;
    private String suggested_mitigation;
    private String risk_status;

    @ManyToOne
    @JoinColumn(name = "data_scope_id")
    private DataScope dataScope;
}
