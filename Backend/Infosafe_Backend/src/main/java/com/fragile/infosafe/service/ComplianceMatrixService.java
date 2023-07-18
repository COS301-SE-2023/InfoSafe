package com.fragile.infosafe.service;

import com.fragile.infosafe.model.ComplianceMatrix;

import java.util.List;

public interface ComplianceMatrixService {
    public ComplianceMatrix saveMatrix(ComplianceMatrix complianceMatrix);
    public List<ComplianceMatrix> getAllMatrices();
}
