package com.fragile.infosafe.model_primary;

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
    private int user_id;
    private String support_type;
    private String support_description;
    private String support_status;

    public int getSupport_id() { return support_id; }

    public void setSupport_id(int support_id) { this.support_id = support_id; }

    public int getUser_id() { return user_id; }

    public void setUser_id(int user_id) { this.user_id = user_id; }

    public String getSupport_type() { return support_type; }

    public void setSupport_type(String support_type) { this.support_type = support_type; }

    public String getSupport_description() { return support_description; }

    public void setSupport_description(String support_description) { this.support_description = support_description; }

    public String getSupport_status() { return support_status; }

    public void setSupport_status(String support_status) { this.support_status = support_status; }

}
