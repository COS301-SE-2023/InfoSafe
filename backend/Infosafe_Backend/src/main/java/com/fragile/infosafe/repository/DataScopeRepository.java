package com.fragile.infosafe.repository;

import com.fragile.infosafe.model.DataScope;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DataScopeRepository extends JpaRepository<DataScope,Integer> {
    boolean existsByDs_name(String name);
}
