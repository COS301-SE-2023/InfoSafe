package com.fragile.infosafe.primary.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="data_scopes")
public class DataScope {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int data_scope_id;
    private String ds_name;
    private String ds_description;
    private Date date_captured;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User dataCustodian;
    private String ds_status;

    @ManyToMany
    @JoinTable(
            name = "data_scope_users",
            joinColumns = @JoinColumn(name = "data_scope_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> users = new HashSet<>();

    @OneToMany(mappedBy = "data_scope_id", cascade = CascadeType.REMOVE)
    private List<Task> tasks;

    @OneToMany(mappedBy = "dataScope", cascade = CascadeType.REMOVE)
    private List<Risk> risks;

    @OneToMany(mappedBy = "data_scope_id", cascade = CascadeType.REMOVE)
    private List<AccessRequest> accessRequests;
}