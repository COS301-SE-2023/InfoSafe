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
@Table(name="access_requests")
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
}
