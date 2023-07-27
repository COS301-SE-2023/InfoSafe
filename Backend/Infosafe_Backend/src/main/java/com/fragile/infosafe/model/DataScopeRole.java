package com.fragile.infosafe.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="data_scope_roles")
public class DataScopeRole {

    @Id
    private int user_id;
    private String role_type;

    private String role_description;


    public int getUserID() { return this.user_id; }

    public String getRoleType() { return this.role_type; }

    public void setRoleType(String role) { this.role_type = role; }

    public String getRoleDescription() { return this.role_description; }

    public void setRoleDescription(String description) { this.role_description = description; }
}
