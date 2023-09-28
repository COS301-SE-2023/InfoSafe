package com.fragile.infosafe.primary.repository;

import com.fragile.infosafe.primary.model.AssetRequests;
import com.fragile.infosafe.primary.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AssetRequestRepository extends JpaRepository<AssetRequests, Integer>{
    @Query("SELECT COUNT(ar) > 0 FROM AssetRequests ar WHERE ar.user.user_id = :userId AND ar.asset.asset_id = :assetId")
    boolean existsByUserIdAndAssetId(@Param("userId") int userId, @Param("assetId") int assetId);

    @Query("SELECT COUNT(ar) FROM AssetRequests ar WHERE ar.user = :user")
    long countAssetRequestsByUser(@Param("user") User user);
}