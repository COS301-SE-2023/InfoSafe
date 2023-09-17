package com.fragile.infosafe.primary.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="datascopes")
public class DataScope {
    @Id@GeneratedValue(strategy = GenerationType.IDENTITY)
    private int data_scope_id;
    private String ds_name;
    private String ds_description;
    private Date date_captured;
    private String data_custodian;
    private String ds_status;
}