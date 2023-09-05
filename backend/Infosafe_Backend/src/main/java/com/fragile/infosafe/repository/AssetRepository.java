package com.fragile.infosafe.repository;

import com.fragile.infosafe.model_primary.Asset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssetRepository extends JpaRepository<Asset,Integer> {

}
