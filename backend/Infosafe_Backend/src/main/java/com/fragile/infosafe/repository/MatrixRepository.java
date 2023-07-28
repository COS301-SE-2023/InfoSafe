package com.fragile.infosafe.repository;

import com.fragile.infosafe.model.Matrix;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MatrixRepository extends JpaRepository<Matrix,Integer> {

}
