package com.fragile.infosafe.primary.repository;

import java.util.List;
import java.util.Optional;

import com.fragile.infosafe.primary.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    Optional<User> findByOtp(String otp);

    @Query("SELECT u FROM User u WHERE u NOT IN (SELECT tu FROM Task t JOIN t.users tu WHERE t.task_id = :taskId)")
    List<User> findUsersNotInTask(@Param("taskId") int taskId);

    @Query("SELECT u.email FROM User u WHERE u <> :dataCustodian")
    List<String> findAllUserNotDataCustodian(@Param("dataCustodian") User dataCustodian);
}

