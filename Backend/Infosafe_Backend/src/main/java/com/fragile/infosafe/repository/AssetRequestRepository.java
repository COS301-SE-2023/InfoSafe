package com.fragile.infosafe.repository;

import java.util.Optional;

import com.fragile.infosafe.model.AssetRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssetRequestRepository extends JpaRepository<AssetRequest, Integer>{
}
