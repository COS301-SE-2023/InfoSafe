package com.fragile.infosafe.primary.repository;

import com.fragile.infosafe.primary.model.AssetRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AssetRequestRepository extends JpaRepository<AssetRequest, Integer>{
    @Query("SELECT COUNT(ar) > 0 FROM AssetRequest ar WHERE ar.user_id = :userId AND ar.asset_id = :assetId")
    boolean existsByUserIdAndAssetId(@Param("userId") int userId, @Param("assetId") int assetId);
}
