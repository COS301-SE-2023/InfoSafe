package com.fragile.infosafe.repository;

import java.util.List;

import com.fragile.infosafe.model.SupportRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SupportRequestRepository extends JpaRepository<SupportRequest, Integer>{
    @Query("SELECT sr FROM SupportRequest sr WHERE sr.user_id = :user_id")
    List<SupportRequest> findByUser_id(@Param("user_id") int user_id);
}
