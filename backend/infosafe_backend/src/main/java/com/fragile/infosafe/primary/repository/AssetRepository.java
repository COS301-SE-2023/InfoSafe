package com.fragile.infosafe.primary.repository;

import com.fragile.infosafe.primary.model.Asset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AssetRepository extends JpaRepository<Asset,Integer> {
    @Query(value = "SELECT * FROM asset WHERE asset_id = :assetId", nativeQuery = true)
    Optional<Asset> findByAssetId(@Param("assetId") int asset_id);
}
