package com.fragile.infosafe.service;

import com.fragile.infosafe.model_primary.Risk;
import com.fragile.infosafe.repository.RiskRepository;
import com.fragile.infosafe.requests.RiskRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RiskService {
    private final RiskRepository riskRepository;

    public List<Risk> getAllRisks() {
        return riskRepository.findAll();
    }

    public ResponseEntity<String> makeRisk(RiskRequest request){
        var risk = Risk.builder()
                .impact_rating(request.getImpact_rating())
                .probability_rating(request.getProbability_rating())
                .risk_description(request.getRisk_description())
                .suggested_mitigation(request.getSuggested_mitigation())
                .risk_status(request.getRisk_status())
                .build();
        riskRepository.save(risk);
        return ResponseEntity.status(HttpStatus.OK).body("added");
    }

    public Risk updateRisk(Risk risk) {return riskRepository.save(risk);}
}
