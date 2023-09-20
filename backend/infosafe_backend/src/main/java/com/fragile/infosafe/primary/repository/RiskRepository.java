package com.fragile.infosafe.primary.repository;

import com.fragile.infosafe.primary.model.Risk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RiskRepository extends JpaRepository<Risk,Integer> {
}
