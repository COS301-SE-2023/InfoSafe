package com.fragile.infosafe.service;

import com.fragile.infosafe.model.Matrix;

import java.util.List;

public interface MatrixService {
    public Matrix saveMatrix(Matrix matrix);
    public List<Matrix> getAllMatrices();
}
