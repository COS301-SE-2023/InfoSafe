package com.fragile.infosafe.primary.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "current_assignee_id", referencedColumnName = "user_id")
    private User current_assignee;
    @ManyToOne
    @JoinColumn(name = "previous_assignee_id", referencedColumnName = "user_id")
    private User previous_assignee;

    @JsonIgnore
    @OneToMany(mappedBy = "asset")
    private List<AssetRequests> assetRequestsList;

    @PreUpdate
    @PrePersist
    private void validateAssignees() {
        if (current_assignee != null && current_assignee.equals(previous_assignee)) {
            throw new IllegalArgumentException("Current assignee cannot be the same as the previous assignee.");
        }
    }

    @Override
    public String toString() {
        return "Asset{" +
                "asset_id=" + asset_id +
                ", asset_name='" + asset_name + '\'' +
                ", asset_description='" + asset_description + '\'' +
                ", status='" + status + '\'' +
                ", availability='" + availability + '\'' +
                ", used='" + used + '\'' +
                ", device_type='" + device_type + '\'' +
                ", current_assignee=" + (current_assignee != null ? current_assignee.getUser_id() : "null") +
                ", previous_assignee=" + (previous_assignee != null ? previous_assignee.getUser_id() : "null") +
                '}';
    }

}

