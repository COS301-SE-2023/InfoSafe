package com.fragile.infosafe.repository;

import com.fragile.infosafe.model_primary.AssignedTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssignedTaskRepository extends JpaRepository<AssignedTask,Integer> {
}
