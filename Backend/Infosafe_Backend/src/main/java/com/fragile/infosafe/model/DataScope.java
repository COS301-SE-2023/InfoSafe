package com.fragile.infosafe.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name="datascopes")
public class DataScope {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String ds_name;
    private String description;
    private String role_name;
    private String role_description;
    private Date date_captured;
    private String data_custodian;
    private String administrator;
    private String status;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDs_name() {
        return ds_name;
    }

    public void setDs_name(String ds_name) {
        this.ds_name = ds_name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}