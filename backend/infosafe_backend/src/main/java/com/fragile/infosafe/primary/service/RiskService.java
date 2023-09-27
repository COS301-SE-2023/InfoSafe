package com.fragile.infosafe.primary.service;

import com.fragile.infosafe.primary.model.DataScope;
import com.fragile.infosafe.primary.model.Risk;
import com.fragile.infosafe.primary.repository.DataScopeRepository;
import com.fragile.infosafe.primary.repository.RiskRepository;
import com.fragile.infosafe.primary.requests.RiskRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class RiskService {
    private final RiskRepository riskRepository;
    private final DataScopeRepository dataScopeRepository;
    private final DeleteService deleteService;

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

    public Risk updateRisk(RiskRequest riskRequest, int risk_id) {
        Risk risk = riskRepository.findRiskByRiskId(risk_id).get();
        risk.setRisk_description(risk.getRisk_description());
        risk.setRisk_name(risk.getRisk_name());
        risk.setRisk_status(risk.getRisk_status());
        risk.setImpact_rating(risk.getImpact_rating());
        risk.setProbability_rating(risk.getProbability_rating());
        risk.setSuggested_mitigation(risk.getSuggested_mitigation());
        risk.setDataScope(dataScopeRepository.findByDataScopeId(riskRequest.getDataScope_id()).get());

        return riskRepository.save(risk);}

    public ResponseEntity<Boolean> reviewRisk(int risk_id) {
        return ResponseEntity.ok(deleteService.deleteRiskAndSaveToSecondary(risk_id));
    }
}
