package com.fragile.infosafe.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name="assets")
public class Asset {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String asset_name;
    private String asset_description;
    private String status;
    private String date_acquired;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAsset_name() {
        return asset_name;
    }

    public void setAsset_name(String asset_name) {
        this.asset_name = asset_name;
    }

    public String getAsset_description() {
        return asset_description;
    }

    public void setAsset_description(String asset_description) {
        this.asset_description = asset_description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDate_acquired() {
        return date_acquired;
    }

    public void setDate_acquired(String date_acquired) {
        this.date_acquired = date_acquired;
    }
}