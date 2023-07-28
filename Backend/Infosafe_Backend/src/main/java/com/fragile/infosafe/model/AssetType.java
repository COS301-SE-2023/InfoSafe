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
@Table(name="asset_types")
public class AssetType {

    @Id
    private int asset_type_id;
    private String type_name;
    public int getAssetTypeID() { return this.asset_type_id; }
    public String getTypeName() { return this.type_name; }
    public void setTypeName(String name)  {this.type_name = name;}
}
