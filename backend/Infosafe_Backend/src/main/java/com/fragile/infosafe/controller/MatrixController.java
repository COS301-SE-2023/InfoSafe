package com.fragile.infosafe.controller;

import com.fragile.infosafe.model.Matrix;
import com.fragile.infosafe.service.MatrixService;
import com.fragile.infosafe.requests.MatrixRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@Slf4j
@RestController
@RequestMapping("api/matrix")
@RequiredArgsConstructor
public class MatrixController {
    private final MatrixService service;

    @PostMapping("/addM")
    public ResponseEntity addM(@RequestBody MatrixRequest matrix) {
        log.info("Adding a task");
        return ResponseEntity.ok(service.makeM(matrix));
    }

    @GetMapping("/getM")
    public List<Matrix> matrixlist() { return service.getAllMatrices(); }

    @PutMapping("/update/{id}")
    public Matrix updateMatrix (@PathVariable("id") int task_id, @RequestBody Matrix matrix) {
        matrix.setTask_id(task_id);
        return service.updateMatrix(matrix);
    }
}
