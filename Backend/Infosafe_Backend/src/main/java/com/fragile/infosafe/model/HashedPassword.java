package com.fragile.infosafe.model;

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
@Table(name="hashed_passwords")
public class HashedPassword {
    @Id
    private int user_id;
    private String hashed_password;

    public String getPassword() { return  this.hashed_password; }

    public void setPassword(String password) { this.hashed_password = password; }
}
