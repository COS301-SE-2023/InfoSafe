package com.fragile.infosafe.primary.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
@Table(name="support_requests")
public class SupportRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int support_id;
    private String support_type;
    private String support_description;
    private String support_status;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user_id;

    @ManyToOne
    @JoinColumn(name = "data_scope_id")
    private DataScope dataScope_id;

    @ManyToOne
    @JoinColumn(name = "task_id")
    private Task task_id;

    @ManyToOne
    @JoinColumn(name = "asset_id")
    private Asset asset_id;

    @Override
    public String toString() {
        return "SupportRequest{" +
                "support_id=" + support_id +
                ", support_type='" + support_type + '\'' +
                ", support_description='" + support_description + '\'' +
                ", support_status='" + support_status + '\'' +
                ", user_id=" + (user_id != null ? user_id.getUser_id() : null) +
                ", dataScope_id=" + (dataScope_id != null ? dataScope_id.getData_scope_id() : null) +
                ", task_id=" + (task_id != null ? task_id.getTask_id() : null) +
                ", asset_id=" + (asset_id != null ? asset_id.getAsset_id() : null) +
                '}';
    }
}
