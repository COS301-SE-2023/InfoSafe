package com.fragile.infosafe.delete.deletemodel;

import com.fragile.infosafe.primary.model.Asset;
import com.fragile.infosafe.primary.model.User;
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
@Table(name = "deleted_asset_request")
public class DeletedAssetRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int asset_request_id;
    private String reason;
    private Date desired_date;
    private String request_status;
//    @ManyToOne
//    @JoinColumn(name = "user_id")
//    private User user;
//
//    @ManyToOne
//    @JoinColumn(name = "asset_id")
//    private Asset asset;
}
