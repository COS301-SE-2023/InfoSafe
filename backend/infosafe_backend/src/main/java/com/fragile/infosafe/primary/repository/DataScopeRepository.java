package com.fragile.infosafe.primary.repository;

import com.fragile.infosafe.primary.model.DataScope;
import com.fragile.infosafe.primary.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.xml.crypto.Data;
import java.util.List;
import java.util.Optional;

@Repository
public interface DataScopeRepository extends JpaRepository<DataScope,Integer> {
    @Query("SELECT CASE WHEN COUNT(ds) > 0 THEN true ELSE false END FROM DataScope ds WHERE ds.ds_name = :name")
    boolean existsByds_name(String name);

    @Query(value = "SELECT * FROM data_scopes WHERE data_scope_id = :dsId", nativeQuery = true)
    Optional<DataScope> findByDataScopeId(@Param("dsId") int ds_id);

    @Query("SELECT ds FROM DataScope ds " +
            "LEFT JOIN ds.users u " +
            "WHERE u <> :user OR u IS NULL")
    List<DataScope> findDataScopesNotAssociatedWithUser(@Param("user") User user);

    List<DataScope> findAllByUsers(User user);


}
