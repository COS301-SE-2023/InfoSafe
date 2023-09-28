package com.fragile.infosafe.primary.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="tasks")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int task_id;
    private String task_name;
    private String task_description;
    private String task_status;
    private String due_date;
    private String date_created;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "data_scope_id")
    private DataScope data_scope_id;

    @ManyToMany(cascade = CascadeType.PERSIST)
    @JoinTable(
            name = "task_users",
            joinColumns = @JoinColumn(name = "task_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> users = new HashSet<>();
    @Column(nullable = true)
    private int daysUntilDue;
}