package com.fragile.infosafe.repository;

import com.fragile.infosafe.model.AssignedAsset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssignedAssetRepository extends JpaRepository<AssignedAsset, String> {
}
