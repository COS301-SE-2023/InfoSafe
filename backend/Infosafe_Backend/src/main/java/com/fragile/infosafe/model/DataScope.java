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
@Table(name="datascopes")
public class DataScope {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String dsName;
    private String description;
    private String roleName;
    private String roleDescription;
    private String dateCaptured;
    private String dataCustodian;
    private String administrator;
    private String status;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDsName() {
        return dsName;
    }

    public void setDsName(String ds_name) {
        this.dsName = ds_name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String role_name) {
        this.roleName = role_name;
    }

    public String getRoleDescription() {
        return roleDescription;
    }

    public void setRoleDescription(String role_description) {
        this.roleDescription = role_description;
    }

    public String getDateCaptured() {
        return dateCaptured;
    }

    public void setDateCaptured(String date_captured) {
        this.dateCaptured = date_captured;
    }

    public String getDataCustodian() {
        return dataCustodian;
    }

    public void setDataCustodian(String data_custodian) {
        this.dataCustodian = data_custodian;
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