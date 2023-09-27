package com.fragile.infosafe.primary.repository;

import com.fragile.infosafe.primary.model.Notifications;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface NotificationsRepository extends JpaRepository<Notifications, String> {
    void deleteByCreatedAtBefore(LocalDateTime dateTime);

    @Query("SELECT n FROM Notifications n JOIN FETCH n.user u WHERE u.user_id = :userId")
    List<Notifications> findByUserUserId(@Param("userId") int userId);
}
