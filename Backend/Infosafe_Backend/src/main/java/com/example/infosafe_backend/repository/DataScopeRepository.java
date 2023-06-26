package com.example.infosafe_backend.repository;

import com.example.infosafe_backend.model.DataScope;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DataScopeRepository extends JpaRepository<DataScope,Integer> {

}
