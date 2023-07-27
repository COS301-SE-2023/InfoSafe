package com.fragile.infosafe.repository;

import com.fragile.infosafe.model.AssetType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssetTypeRepository extends JpaRepository<AssetType, String> {
}
