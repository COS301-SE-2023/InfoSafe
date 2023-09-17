package com.fragile.infosafe.primary.model;

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
@Table(name="data_scope_roles")
public class DataScopeRole {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int role_id;
    private int ds_id;
    private String role_type;
    private String role_description;
}
