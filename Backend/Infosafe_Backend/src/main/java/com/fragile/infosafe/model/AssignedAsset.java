package com.fragile.infosafe.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="assigned_assets")
public class AssignedAsset {

    @Id
    private int asset_id;
    private int user_id;

    public int getAssetID() { return this.asset_id; }

    public int getUserID() { return this.user_id; }

    public void setUserID(int user) { this.user_id = user; }
}
