package com.fragile.infosafe.repository;

import com.fragile.infosafe.model.Asset;
import com.fragile.infosafe.model.AssetRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssetRepository extends JpaRepository<Asset,Integer> {

}
