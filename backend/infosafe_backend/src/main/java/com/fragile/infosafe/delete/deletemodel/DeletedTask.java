package com.fragile.infosafe.delete.deletemodel;

import com.fragile.infosafe.primary.model.User;
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
@Table(name="deleted_tasks")
public class DeletedTask {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int task_id;
    private String task_description;
    private String task_status;
    private String due_date;
    private String date_created;
    private String completionStatus;

    @ElementCollection
    @CollectionTable(name = "delete_task_users", joinColumns = @JoinColumn(name = "task_id"))
    @Column(name = "user_id")
    private Set<Integer> userIds = new HashSet<>();

}
