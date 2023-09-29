package com.fragile.infosafe.delete.deleterepository;

import com.fragile.infosafe.delete.deletemodel.DeletedRisk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeletedRiskRepository extends JpaRepository<DeletedRisk, Integer> {
}
