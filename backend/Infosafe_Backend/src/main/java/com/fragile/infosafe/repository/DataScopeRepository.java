package com.fragile.infosafe.repository;

import com.fragile.infosafe.model.DataScope;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface DataScopeRepository extends JpaRepository<DataScope,Integer> {
    @Query("SELECT CASE WHEN COUNT(ds) > 0 THEN true ELSE false END FROM DataScope ds WHERE ds.ds_name = :name")
    boolean existsByds_name(String name);
}
