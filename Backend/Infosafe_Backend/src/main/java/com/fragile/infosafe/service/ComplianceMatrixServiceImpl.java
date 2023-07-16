package com.fragile.infosafe.service;

import com.fragile.infosafe.model.ComplianceMatrix;
import com.fragile.infosafe.repository.ComplianceMatrixRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ComplianceMatrixServiceImpl implements ComplianceMatrixService {
    @Autowired
    private ComplianceMatrixRepository complianceMatrixRepository;

    @Override
    public ComplianceMatrix saveMatrix(ComplianceMatrix complianceMatrix) {
        return complianceMatrixRepository.save(complianceMatrix);
    }

    @Override
    public List<ComplianceMatrix> getAllMatrices() {
        return complianceMatrixRepository.findAll();
    }
}
