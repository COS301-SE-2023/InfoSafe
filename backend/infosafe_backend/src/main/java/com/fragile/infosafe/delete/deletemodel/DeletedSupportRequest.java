package com.fragile.infosafe.delete.deletemodel;

import com.fragile.infosafe.primary.model.User;
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
@Table(name="deleted_support")
public class DeletedSupportRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int support_id;
    private String support_type;
    private String support_description;
    private String support_status;
    private int user_id;
    @Column(nullable = true)
    private int data_scope_id;
    @Column(nullable = true)
    private int asset_id;
    @Column(nullable = true)
    private int task_id;
//    @ManyToOne
//    @JoinColumn(name = "user_id")
//    private User user_id;
}
