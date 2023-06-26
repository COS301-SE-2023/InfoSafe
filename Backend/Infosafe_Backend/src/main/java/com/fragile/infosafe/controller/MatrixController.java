package com.fragile.infosafe.controller;

import com.fragile.infosafe.model.Matrix;
import com.fragile.infosafe.service.MatrixService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/matrix")
@CrossOrigin
public class MatrixController {
    @Autowired
    private MatrixService matrixService;

    @PostMapping("/add")
    public String add(@RequestBody Matrix matrix){
        matrixService.saveMatrix(matrix);
        return "New compliance matrix is added";
    }

    @GetMapping("/getAll")
    public List<Matrix> list() { return matrixService.getAllMatrices(); }
}
