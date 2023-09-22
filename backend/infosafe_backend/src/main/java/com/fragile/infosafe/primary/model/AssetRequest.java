package com.fragile.infosafe.primary.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="asset_requests")
public class AssetRequest {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int asset_request_id;
    private String reason;
    private Date desired_date;
    private String request_status;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "asset_id")
    private Asset asset;
}
