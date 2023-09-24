package com.fragile.infosafe.primary.service;

import com.fragile.infosafe.primary.model.DataScope;
import com.fragile.infosafe.primary.model.Risk;
import com.fragile.infosafe.primary.repository.DataScopeRepository;
import com.fragile.infosafe.primary.repository.RiskRepository;
import com.fragile.infosafe.primary.requests.RiskRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RiskService {
    private final RiskRepository riskRepository;
    private final DataScopeRepository dataScopeRepository;

    public List<Risk> getAllRisks() {
        return riskRepository.findAll();
    }

    public ResponseEntity<String> makeRisk(RiskRequest request){
        var risk = Risk.builder()
                .risk_name(request.getRisk_name())
                .impact_rating(request.getImpact_rating())
                .probability_rating(request.getProbability_rating())
                .risk_description(request.getRisk_description())
                .suggested_mitigation(request.getSuggested_mitigation())
                .risk_status(request.getRisk_status())
                .build();

        if (dataScopeRepository.findByDataScopeId(request.getDataScope_id()).isPresent()) {
            DataScope dataScope = dataScopeRepository.findByDataScopeId(request.getDataScope_id()).get();
            if (dataScope != null) {
                risk.setDataScope(dataScope);
            }
        }
        riskRepository.save(risk);
        return ResponseEntity.status(HttpStatus.OK).body("added");
    }

    public Risk updateRisk(Risk risk) {return riskRepository.save(risk);}
}
