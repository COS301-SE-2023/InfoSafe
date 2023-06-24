package com.example.infosafe_backend.service;

import com.example.infosafe_backend.model.Matrix;

import java.util.List;

public interface MatrixService {
    public Matrix saveMatrix(Matrix matrix);
    public List<Matrix> getAllMatrices();
}
