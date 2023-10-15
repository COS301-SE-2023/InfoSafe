package com.fragile.infosafe.primary.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "assets")
public class Asset {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int asset_id;
    private String asset_name;
    private String asset_description;
    private String status;
    private String availability;
    private String used;
    private String device_type;

    @ManyToOne
    @JoinColumn(name = "current_assignee_id", referencedColumnName = "user_id")
    private User current_assignee;
    @ManyToOne
    @JoinColumn(name = "previous_assignee_id", referencedColumnName = "user_id")
    private User previous_assignee;

    @OneToMany(mappedBy = "asset", cascade = CascadeType.REMOVE)
    private List<AssetRequests> assetRequestsList;

    @PreUpdate
    @PrePersist
    private void validateAssignees() {
        if (current_assignee != null && current_assignee.equals(previous_assignee)) {
            throw new IllegalArgumentException("Current assignee cannot be the same as the previous assignee.");
        }
    }
}

