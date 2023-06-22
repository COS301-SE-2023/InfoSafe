package com.example.infosafe_backend.service;

import com.example.infosafe_backend.model.Matrix;
import com.example.infosafe_backend.repository.MatrixRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MatrixServiceImpl implements MatrixService {
    @Autowired
    private MatrixRepository matrixRepository;

    @Override
    public Matrix saveMatrix(Matrix matrix) {
        return matrixRepository.save(matrix);
    }
}
