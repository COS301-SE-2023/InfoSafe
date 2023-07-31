package com.fragile.infosafe.service;

import com.fragile.infosafe.model.Matrix;
import com.fragile.infosafe.repository.MatrixRepository;
import com.fragile.infosafe.requests.MatrixRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MatrixService {
    private final MatrixRepository matrixRepository;

    public ResponseEntity<String> makeM(MatrixRequest request){
        var matrix = Matrix.builder()
                .task_id(request.getTask_id())
                .task_description(request.getTask_description())
                .task_status(request.getTask_status())
                .due_date(request.getDue_date())
                .date_completed(request.getDate_completed())
                .build();
                matrixRepository.save(matrix);
        return ResponseEntity.status(HttpStatus.OK).body("added");
    }

    public List<Matrix> getAllMatrices() {return matrixRepository.findAll();}

    public Matrix updateMatrix(Matrix matrix) {return matrixRepository.save(matrix);}
}
