package com.fragile.infosafe.service;

import com.fragile.infosafe.model.Matrix;
import com.fragile.infosafe.repository.MatrixRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MatrixServiceImpl implements MatrixService {
    @Autowired
    private MatrixRepository matrixRepository;

    @Override
    public Matrix saveMatrix(Matrix matrix) {
        return matrixRepository.save(matrix);
    }

    @Override
    public List<Matrix> getAllMatrices() {
        return matrixRepository.findAll();
    }
}
