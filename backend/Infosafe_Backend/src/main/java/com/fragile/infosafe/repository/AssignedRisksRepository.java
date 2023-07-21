package com.fragile.infosafe.repository;

import com.fragile.infosafe.model.AssignedRisk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssignedRisksRepository extends JpaRepository<AssignedRisk, String> {
}
