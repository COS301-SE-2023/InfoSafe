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
@Table(name="data_scopes")
public class DataScope {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int data_scope_id;
    private String ds_name;
    private String ds_description;
    private String date_captured;
    private String ds_status;

    public int getData_scope_id() {
        return data_scope_id;
    }

    public void setData_scope_id(int id) {
        this.data_scope_id = id;
    }

    public String getDs_name() {
        return ds_name;
    }

    public void setDs_name(String ds_name) {
        this.ds_name = ds_name;
    }

    public String getDs_description() {
        return ds_description;
    }

    public void setDs_description(String description) {
        this.ds_description = description;
    }

    public String getDate_captured() {
        return date_captured;
    }

    public void setDate_captured(String date_captured) {
        this.date_captured = date_captured;
    }

    public String getDs_status() {
        return ds_status;
    }

    public void setDs_status(String status) {
        this.ds_status = status;
    }
}