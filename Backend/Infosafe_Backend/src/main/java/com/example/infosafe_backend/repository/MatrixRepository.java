package com.example.infosafe_backend.repository;

import com.example.infosafe_backend.model.Matrix;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MatrixRepository extends JpaRepository<Matrix,Integer> {

}
