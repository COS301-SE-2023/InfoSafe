package com.fragile.infosafe.delete.deleterepository;

import com.fragile.infosafe.delete.deletemodel.DeletedAccessRequest;
import com.fragile.infosafe.delete.deletemodel.DeletedTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface DeletedAccessRequestRepository extends JpaRepository<DeletedAccessRequest, Integer> {

}