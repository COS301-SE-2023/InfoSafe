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
@Table(name="support_requests")
public class SupportRequest {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
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
}
