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
@Table(name="access_requests", uniqueConstraints = {@UniqueConstraint(columnNames = {"user_id", "data_scope_id"})})
public class AccessRequest {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int request_id;
    private String reason;
    private String status;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "data_scope_id")
    private DataScope data_scope;
}
