package com.example.infosafe_backend.controller;

import com.example.infosafe_backend.model.Matrix;
import com.example.infosafe_backend.service.MatrixService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/matrix")
public class MatrixController {
    @Autowired
    private MatrixService matrixService;

    @PostMapping("/add")
    public String add(@RequestBody Matrix matrix){
        matrixService.saveMatrix(matrix);
        return "New compliance matrix is added";
    }

}
