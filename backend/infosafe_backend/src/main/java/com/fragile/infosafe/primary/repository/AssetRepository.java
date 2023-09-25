package com.fragile.infosafe.primary.repository;

import com.fragile.infosafe.primary.model.Asset;
import com.fragile.infosafe.primary.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AssetRepository extends JpaRepository<Asset,Integer> {
    @Query(value = "SELECT * FROM assets WHERE asset_id = :assetId", nativeQuery = true)
    Optional<Asset> findByAssetId(@Param("assetId") int asset_id);

    @Query("SELECT COUNT(a) FROM Asset a WHERE a.current_assignee = :assignee")
    long countByCurrentAssignee(@Param("assignee") User assignee);

    @Query("SELECT a FROM Asset a WHERE a.current_assignee = :assignee")
    List<Asset> findByCurrentAssignee(@Param("assignee") User assignee);

    List<Asset> findAllByAvailability(String availability);
}
