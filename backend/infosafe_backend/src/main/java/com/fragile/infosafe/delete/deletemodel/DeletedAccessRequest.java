package com.fragile.infosafe.delete.deletemodel;

import com.fragile.infosafe.primary.model.DataScope;
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
@Table(name="deleted_access")
public class DeletedAccessRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int request_id;
    private String reason;
    private String status;
    private int user_id;
    private int data_scope_id;
//    @ManyToOne
//    @JoinColumn(name = "user_id")
//    private User user_id;
//
//    @ManyToOne
//    @JoinColumn(name = "data_scope_id")
//    private DataScope data_scope_id;
}
