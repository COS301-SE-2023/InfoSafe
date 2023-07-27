package com.fragile.infosafe.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;
import org.springframework.context.annotation.Primary;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="asset_requests")
public class AssetRequest {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int asset_request_id;
    private int user_id;
    private String reason;
    private Date desired_date;
    private String request_status;

    public int getAsset_request_id() { return asset_request_id; }

    public void setAsset_request_id(int asset_request_id) { this.asset_request_id = asset_request_id; }

    public int getUser_id() { return user_id; }

    public void setUser_id(int user_id) { this.user_id = user_id; }

    public String getReason() { return reason; }

    public void setReason(String reason) { this.reason = reason; }

    public Date getDesired_date() { return desired_date; }

    public void setDesired_date(Date desired_date) { this.desired_date = desired_date; }

    public String getRequest_status() { return request_status; }

    public void setRequest_status(String request_status) { this.request_status = request_status; }
}
