package com.fragile.infosafe.primary.repository;

import com.fragile.infosafe.primary.model.DataScope;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DataScopeRepository extends JpaRepository<DataScope,Integer> {
    @Query("SELECT CASE WHEN COUNT(ds) > 0 THEN true ELSE false END FROM DataScope ds WHERE ds.ds_name = :name")
    boolean existsByds_name(String name);

    @Query(value = "SELECT * FROM datascope WHERE data_scope_id = :dataScopeId", nativeQuery = true)
    Optional<DataScope> findByDataScopeId(@Param("dataScopeId") int data_scope_id);


}
