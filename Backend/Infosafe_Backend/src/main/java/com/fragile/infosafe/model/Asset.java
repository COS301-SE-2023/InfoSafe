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
@Table(name="Assets")
public class Asset {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String serialNumber;
    private int typeID;
    private String assetDescription;
    private String cleanStatus;
    private Boolean availability;
    private Boolean newDevice;

    public String getSerialNumber() {
        return serialNumber;
    }

    public void setSerialNumber(String serial) {
        this.serialNumber = serial;
    }

    public int getTypeID() {
        return typeID;
    }

    public void setTypeID(int typeID) {
        this.typeID = typeID;
    }

    public String getAssetDescription() {
        return assetDescription;
    }

    public void setAssetDescription(String asset_description) {
        this.assetDescription = asset_description;
    }

    public String getCleanStatus() {
        return cleanStatus;
    }

    public void setCleanStatus(String status) {
        this.cleanStatus = status;
    }

    public Boolean getAvailability() { return availability; }

    public void setAvailability(Boolean availability) { this.availability = availability; }

    public Boolean getNewDevice() {
        return newDevice;
    }

    public void setNewDevice(Boolean newDevice) {
        this.newDevice = newDevice;
    }
}