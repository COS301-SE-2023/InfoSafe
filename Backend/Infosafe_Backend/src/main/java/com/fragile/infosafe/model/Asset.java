package com.fragile.infosafe.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.context.annotation.Primary;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="assets")
public class Asset {
    @Id
    private String serial_number;
    private int type_id;
    private String asset_description;
    private String clean_status;
    private Boolean availability;
    private Boolean new_device;

    public String getSerialNumber() {
        return serial_number;
    }

    public void setSerialNumber(String serial) {
        this.serial_number = serial;
    }

    public int getTypeID() {
        return type_id;
    }

    public void setTypeID(int typeID) {
        this.type_id = typeID;
    }

    public String getAssetDescription() {
        return asset_description;
    }

    public void setAssetDescription(String asset_description) {
        this.asset_description = asset_description;
    }

    public String getCleanStatus() {
        return clean_status;
    }

    public void setCleanStatus(String status) {
        this.clean_status = status;
    }

    public Boolean getAvailability() { return availability; }

    public void setAvailability(Boolean availability) { this.availability = availability; }

    public Boolean getNewDevice() {
        return new_device;
    }

    public void setNewDevice(Boolean newDevice) {
        this.new_device = newDevice;
    }
}