package com.fragile.infosafe.primary.repository;

import com.fragile.infosafe.primary.model.AssignedTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssignedTaskRepository extends JpaRepository<AssignedTask,Integer> {
}
