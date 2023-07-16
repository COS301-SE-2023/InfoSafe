package com.fragile.infosafe.repository;

import com.fragile.infosafe.model.ComplianceMatrix;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ComplianceMatrixRepository extends JpaRepository<ComplianceMatrix,Integer> {

}
