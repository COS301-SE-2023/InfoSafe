package com.fragile.infosafe.repository;

import java.util.Optional;

import com.fragile.infosafe.model.SupportRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SupportRequestRepository extends JpaRepository<SupportRequest, Integer>{
}
