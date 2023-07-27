package com.fragile.infosafe.service;

import com.fragile.infosafe.model.AssignedRisk;
import com.fragile.infosafe.repository.AssignedRiskRepository;
import com.fragile.infosafe.requests.AssignedRiskRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AssignedRiskService {

    private final AssignedRiskRepository arRepository;

    public List<AssignedRisk> getAllAssignedRisks() { return arRepository.findAll(); }

    public ResponseEntity<String> createAssignedRisk(AssignedRiskRequest arRequest){
        var assignedRisk = AssignedRisk.builder()
                .risk_id(arRequest.getRisk_id())
                .user_id(arRequest.getUser_id())
                .build();
        arRepository.save(assignedRisk);
        return ResponseEntity.status(HttpStatus.OK).body("Assigned Risk Created.");
    }
}
