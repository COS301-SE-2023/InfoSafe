package com.fragile.infosafe.service;

import com.fragile.infosafe.model.Matrix;
import com.fragile.infosafe.repository.MatrixRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MatrixService {
    private MatrixRepository matrixRepository;
    public Matrix saveMatrix(Matrix matrix) {
        return matrixRepository.save(matrix);
    }

    public List<Matrix> getAllMatrices() {
        return matrixRepository.findAll();
    }
}
