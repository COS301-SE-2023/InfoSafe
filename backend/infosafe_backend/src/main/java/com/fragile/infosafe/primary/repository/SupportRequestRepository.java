package com.fragile.infosafe.primary.repository;

import java.util.List;

import com.fragile.infosafe.primary.model.SupportRequest;
import com.fragile.infosafe.primary.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface SupportRequestRepository extends JpaRepository<SupportRequest, Integer>{
    @Query("SELECT sr FROM SupportRequest sr WHERE sr.user_id.user_id = :userId")
    List<SupportRequest> findAllByUserId(@Param("userId") int userId);

    @Query("SELECT COUNT(sr) FROM SupportRequest sr WHERE sr.user_id = :user")
    long countSupportRequestByUser(@Param("user") User user);
}