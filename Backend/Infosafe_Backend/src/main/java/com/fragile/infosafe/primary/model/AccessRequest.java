package com.fragile.infosafe.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.context.annotation.Primary;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="access_requests")
public class AccessRequest {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int request_id;
    private int user_id;
    private int ds_id;
    private String reason;
    private String status;

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getStatus() { return status; }

    public void setStatus(String status) {this.status = status;}
    public int getRequest_id() { return request_id; }

    public void setRequest_id(int request_id) { this.request_id = request_id; }

    public int getUser_id() { return user_id; }

    public void setUser_id(int user_id) { this.user_id = user_id; }

    public int getDs_id() { return ds_id; }

    public void setDs_id(int ds_id) { this.ds_id = ds_id; }
}
