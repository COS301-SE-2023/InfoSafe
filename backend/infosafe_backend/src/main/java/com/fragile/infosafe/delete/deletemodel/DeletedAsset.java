package com.fragile.infosafe.delete.deletemodel;

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
@Table(name="deleted_assets")
public class DeletedAsset {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int asset_id;
    private String asset_name;
    private String asset_description;
    private String status;
    private String availability;
    private String used;
    private String current_assignee;
    private String previous_assignee;
    private String device_type;
}
