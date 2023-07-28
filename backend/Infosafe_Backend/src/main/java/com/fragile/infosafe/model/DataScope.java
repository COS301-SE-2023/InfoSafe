package com.fragile.infosafe.model;

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
    private String role_name;
    private String role_description;
    private Date date_captured;
    private String data_custodian;
    private String administrator;
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

    public String getRole_name() {
        return role_name;
    }

    public void setRole_name(String role_name) {
        this.role_name = role_name;
    }

    public String getRole_description() {
        return role_description;
    }

    public void setRole_description(String role_description) {
        this.role_description = role_description;
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

    public String getAdministrator() {
        return administrator;
    }

    public void setAdministrator(String administrator) {
        this.administrator = administrator;
    }

    public String getDs_status() {
        return ds_status;
    }

    public void setDs_status(String ds_status) {
        this.ds_status = ds_status;
    }
}