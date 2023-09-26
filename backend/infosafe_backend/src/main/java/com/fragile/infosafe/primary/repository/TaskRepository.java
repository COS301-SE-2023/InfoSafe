package com.fragile.infosafe.primary.repository;

import com.fragile.infosafe.primary.model.Task;
import com.fragile.infosafe.primary.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TaskRepository extends JpaRepository<Task,Integer> {
    @Query(value = "SELECT * FROM tasks WHERE task_id = :taskId", nativeQuery = true)
    Optional<Task> findByTaskId(@Param("taskId") int task_id);

    int countTasksByUsersContains(User user);

    List<Task> findDistinctTasksByUsersContains(User user);

    List<Task> findByUsers(User user);
}
