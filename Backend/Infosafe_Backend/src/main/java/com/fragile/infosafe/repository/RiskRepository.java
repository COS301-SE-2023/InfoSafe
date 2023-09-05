package com.fragile.infosafe.repository;

import com.fragile.infosafe.model.Risk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RiskRepository extends JpaRepository<Risk,Integer> {
}
