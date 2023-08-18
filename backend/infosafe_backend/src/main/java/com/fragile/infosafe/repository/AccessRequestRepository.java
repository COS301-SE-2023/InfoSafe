package com.fragile.infosafe.repository;

import java.util.Optional;

import com.fragile.infosafe.model.AccessRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AccessRequestRepository extends JpaRepository<AccessRequest, Integer>{
    @Query("SELECT COUNT(ar) > 0 FROM AccessRequest ar WHERE ar.user_id = :userId AND ar.ds_id = :dsId")
    boolean existsByUserIdAndDsId(@Param("userId") int userId, @Param("dsId") int dsId);
}
