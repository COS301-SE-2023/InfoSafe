package com.example.infosafe_backend.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name="datascopes")
public class DataScope {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String dsName;
    private String description;
    private String roleName;
    private String roleDescription;
    private Date dateCaptured;
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

    public void setDsName(String dsName) {
        this.dsName = dsName;
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

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public String getRoleDescription() {
        return roleDescription;
    }

    public void setRoleDescription(String roleDescription) {
        this.roleDescription = roleDescription;
    }

    public Date getDateCaptured() {
        return dateCaptured;
    }

    public void setDateCaptured(Date dateCaptured) {
        this.dateCaptured = dateCaptured;
    }

    public String getDataCustodian() {
        return dataCustodian;
    }

    public void setDataCustodian(String dataCustodian) {
        this.dataCustodian = dataCustodian;
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