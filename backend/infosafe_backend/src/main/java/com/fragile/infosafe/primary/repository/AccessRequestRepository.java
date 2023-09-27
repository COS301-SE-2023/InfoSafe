package com.fragile.infosafe.primary.repository;

import com.fragile.infosafe.primary.model.AccessRequest;
import com.fragile.infosafe.primary.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AccessRequestRepository extends JpaRepository<AccessRequest, Integer>{
    @Query("SELECT COUNT(ar) > 0 FROM AccessRequest ar WHERE ar.user_id = :userId AND ar.data_scope_id = :dsId")
    boolean existsByUserIdAndDsId(@Param("userId") int userId, @Param("dsId") int dsId);

    @Query("SELECT COUNT(ar) FROM AccessRequest ar WHERE ar.user_id = :user")
    long countAccessRequestsByUser(@Param("user") User user);
}
