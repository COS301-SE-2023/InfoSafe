package com.fragile.infosafe.primary.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="data_scopes")
public class DataScope {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int data_scope_id;
    private String ds_name;
    private String ds_description;
    private Date date_captured;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User data_custodian;
    private String ds_status;
}