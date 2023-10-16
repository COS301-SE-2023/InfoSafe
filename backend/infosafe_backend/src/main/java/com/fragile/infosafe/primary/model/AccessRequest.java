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
@Table(name="access_requests", uniqueConstraints = {@UniqueConstraint(columnNames = {"user_id", "data_scope_id"})})
public class AccessRequest {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int request_id;
    private String reason;
    private String status;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user_id;

    @ManyToOne
    @JoinColumn(name = "data_scope_id")
    private DataScope data_scope_id;

    @Override
    public String toString() {
        return "AccessRequest{" +
                "request_id=" + request_id +
                ", reason='" + reason + '\'' +
                ", status='" + status + '\'' +
                ", user_id=" + (user_id != null ? user_id.getUser_id() : null) +
                ", data_scope_id=" + (data_scope_id != null ? data_scope_id.getData_scope_id() : null) +
                '}';
    }
}
