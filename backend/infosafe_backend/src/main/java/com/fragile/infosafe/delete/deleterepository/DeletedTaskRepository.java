package com.fragile.infosafe.delete.deleterepository;

import com.fragile.infosafe.delete.deletemodel.DeletedTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface DeletedTaskRepository extends JpaRepository<DeletedTask, Integer> {
    @Query("SELECT COUNT(dt) FROM DeletedTask dt JOIN dt.userIds u WHERE u = :userId")
    long countByUserId(int userId);
}