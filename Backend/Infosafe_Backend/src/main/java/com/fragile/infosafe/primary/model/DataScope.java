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
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int data_scope_id;
    private String ds_name;
    private String ds_description;
    private Date date_captured;
    private String data_custodian;
    private String ds_status;

    public int getData_scope_id() {
        return data_scope_id;
    }

    public void setData_scope_id(int data_scope_id) {
        this.data_scope_id = data_scope_id;
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

    public void setDs_description(String ds_description) {
        this.ds_description = ds_description;
    }

    public Date getDate_captured() {
        return date_captured;
    }

    public void setDate_captured(Date date_captured) {
        this.date_captured = date_captured;
    }

    public String getData_custodian() {
        return data_custodian;
    }

    public void setData_custodian(String data_custodian) {
        this.data_custodian = data_custodian;
    }

    public String getDs_status() {
        return ds_status;
    }

    public void setDs_status(String ds_status) {
        this.ds_status = ds_status;
    }
}