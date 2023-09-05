package com.fragile.infosafe.repository;

import com.fragile.infosafe.model_primary.DataScopeRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DataScopeRoleRepository extends JpaRepository<DataScopeRole, String> {

    @Query("SELECT dsr FROM DataScopeRole dsr WHERE dsr.ds_id = :dsId")
    List<DataScopeRole> findByDsId(@Param("dsId") int dsId);
}