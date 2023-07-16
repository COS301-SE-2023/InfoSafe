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
    private int dataScopeID;
    private String dsName;
    private String dsDescription;
    private String dateCaptured;
    private String dsStatus;

    public int getDataScopeID() {
        return dataScopeID;
    }

    public void setDataScopeID(int id) {
        this.dataScopeID = id;
    }

    public String getDsName() {
        return dsName;
    }

    public void setDsName(String ds_name) {
        this.dsName = ds_name;
    }

    public String getDsDescription() {
        return dsDescription;
    }

    public void setDsDescription(String description) {
        this.dsDescription = description;
    }

    public String getDateCaptured() {
        return dateCaptured;
    }

    public void setDateCaptured(String date_captured) {
        this.dateCaptured = date_captured;
    }

    public String getDsStatus() {
        return dsStatus;
    }

    public void setDsStatus(String status) {
        this.dsStatus = status;
    }
}