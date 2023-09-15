package com.fragile.infosafe.delete.DeleteRepository;

import com.fragile.infosafe.delete.DeletedModels.DeletedUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeletedUserRepository extends JpaRepository<DeletedUser, Integer> {

}