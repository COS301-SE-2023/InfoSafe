package com.fragile.infosafe.repository;

import java.util.Optional;

import com.fragile.infosafe.model.AccessRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccessRequestRepository extends JpaRepository<AccessRequest, Integer>{
}
