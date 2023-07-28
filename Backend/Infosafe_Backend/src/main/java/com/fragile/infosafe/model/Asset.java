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
@Table(name="assets")
public class Asset {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String asset_id;
    private String assetName;
    private String assetDescription;
    private String status;
    private String dateAcquired;
    private String assignee;
    private String type_name;

    public String getType_name() {
        return type_name;
    }

    public void setType_name(String type_name) {
        this.type_name = type_name;
    }



    public String getId() {
        return asset_id;
    }

    public void setId(String asset_id) {
        this.asset_id = asset_id;
    }

    public String getAssetName() {
        return assetName;
    }

    public void setAssetName(String asset_name) {
        this.assetName = asset_name;
    }

    public String getAssetDescription() {
        return assetDescription;
    }

    public void setAssetDescription(String asset_description) {
        this.assetDescription = asset_description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDateAcquired() {
        return dateAcquired;
    }

    public void setDateAcquired(String date_acquired) {
        this.dateAcquired = date_acquired;
    }

    public String getAssignee() {
        return assignee;
    }

    public void setAssignee(String assignee) {
        this.assignee = assignee;
    }
}