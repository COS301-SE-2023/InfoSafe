package com.fragile.infosafe.primary.repository;

import com.fragile.infosafe.primary.model.Risk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.security.config.annotation.web.oauth2.resourceserver.OpaqueTokenDsl;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RiskRepository extends JpaRepository<Risk,Integer> {
    @Query(value = "SELECT * FROM risks WHERE risk_id = :risk_id", nativeQuery = true)
    Optional<Risk> findRiskByRiskId(int risk_id);
}
