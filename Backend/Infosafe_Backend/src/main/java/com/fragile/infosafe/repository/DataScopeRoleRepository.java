package com.fragile.infosafe.repository;

import com.fragile.infosafe.model.DataScopeRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DataScopeRoleRepository extends JpaRepository<DataScopeRole, String> {
}
