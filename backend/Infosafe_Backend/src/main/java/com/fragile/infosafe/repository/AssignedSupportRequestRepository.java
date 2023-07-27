package com.fragile.infosafe.repository;

import com.fragile.infosafe.model.AssignedSupportRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssignedSupportRequestRepository extends JpaRepository<AssignedSupportRequest, String> {
}
