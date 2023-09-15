package com.fragile.infosafe.primary.model;

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
    private int asset_id;
    private String asset_name;
    private String asset_description;
    private String status;
    private String availability;
    private String used;
    private String current_assignee;
    private String previous_assignee;
    private String device_type;

//    public int getAsset_id() {
//        return asset_id;
//    }
//
//    public void setAsset_id(int asset_id) {
//        this.asset_id = asset_id;
//    }

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

    public String getAvailability() {
        return availability;
    }

    public void setAvailability(String availability) {
        this.availability = availability;
    }

    public String getUsed() { return used; }

    public void setUsed(String used) { this.used = used; }

    public String getCurrent_assignee() {
        return current_assignee;
    }

    public void setCurrent_assignee(String current_assignee) {
        this.current_assignee = current_assignee;
    }

    public String getPrevious_assignee() {
        return previous_assignee;
    }

    public void setPrevious_assignee(String previous_assignee) {
        this.previous_assignee = previous_assignee;
    }

    public String getDevice_type() {
        return device_type;
    }

    public void setDevice_type(String device_type) {
        this.device_type = device_type;
    }
}