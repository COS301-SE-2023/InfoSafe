package com.fragile.infosafe.controller;

import com.fragile.infosafe.model.ComplianceMatrix;
import com.fragile.infosafe.service.ComplianceMatrixService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/matrix")
@CrossOrigin
public class ComplianceMatrixController {
    @Autowired
    private ComplianceMatrixService complianceMatrixService;

    @PostMapping("/add")
    public String add(@RequestBody ComplianceMatrix complianceMatrix){
        complianceMatrixService.saveMatrix(complianceMatrix);
        return "New compliance matrix is added";
    }

    @GetMapping("/getAll")
    public List<ComplianceMatrix> list() { return complianceMatrixService.getAllMatrices(); }
}
