package com.fragile.infosafe.primary.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @ManyToOne
    @JoinColumn(name = "data_scope_id")
    private DataScope data_scope_id;

    @ManyToMany
    @JoinTable(
            name = "task_users",
            joinColumns = @JoinColumn(name = "task_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> users = new HashSet<>();

    @Column(nullable = true)
    private int daysUntilDue;

    @Override
    public String toString() {
        return "Task{" +
                "task_id=" + task_id +
                ", task_name='" + task_name + '\'' +
                ", task_description='" + task_description + '\'' +
                ", task_status='" + task_status + '\'' +
                ", due_date='" + due_date + '\'' +
                ", date_created='" + date_created + '\'' +
                ", data_scope_id=" + data_scope_id +
                ", users=" + users +
                ", daysUntilDue=" + daysUntilDue +
                '}';
    }
}