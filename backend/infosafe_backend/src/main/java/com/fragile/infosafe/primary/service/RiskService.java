package com.fragile.infosafe.primary.service;

import com.fragile.infosafe.primary.model.DataScope;
import com.fragile.infosafe.primary.model.Risk;
import com.fragile.infosafe.primary.model.User;
import com.fragile.infosafe.primary.repository.DataScopeRepository;
import com.fragile.infosafe.primary.repository.RiskRepository;
import com.fragile.infosafe.primary.repository.UserRepository;
import com.fragile.infosafe.primary.requests.ReviewRiskRequest;
import com.fragile.infosafe.primary.requests.RiskRequest;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class RiskService {
    private final RiskRepository riskRepository;
    private final DataScopeRepository dataScopeRepository;
    private final UserRepository userRepository;
    private final DeleteService deleteService;
    private final EmailService emailService;
    private final NotificationsService notificationsService;
    private final EncryptionService encryptionService;

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
            risk.setDataScope(dataScope);
            for(User user : dataScope.getUsers()){
                emailUser(encryptionService.encryptString(user.getEmail()), risk.getRisk_name(), dataScope.getDs_name());
                notificationsService.makeNotification("New risk: " + risk.getRisk_name(), user);
            }

        }
        riskRepository.save(risk);
        return ResponseEntity.status(HttpStatus.OK).body("added");
    }

    public void reviewRisk(ReviewRiskRequest riskRequest){
        log.info("Got here");
        Optional<DataScope> optionalDataScope = dataScopeRepository.findByDataScopeId(riskRequest.getDs_id());
        if(optionalDataScope.isPresent()) {
            DataScope ds = optionalDataScope.get();
            for (User user : ds.getUsers()) {
                reviewEmail(encryptionService.encryptString(user.getEmail()), riskRequest.getRisk_name(), ds.getDs_name(), riskRequest.getRisk_status());
                notificationsService.makeNotification("Risk: " + riskRequest.getRisk_name() + "set to " + riskRequest.getRisk_status(), user);
            }
            if (riskRequest.getRisk_status().equals("Accept") || riskRequest.getRisk_status().equals("Avoid")) {
                deleteService.deleteRiskAndSaveToSecondary(riskRequest.getRisk_id());
                ResponseEntity.ok(true);
                return;
            }
        }
        ResponseEntity.ok(true);
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

    private void emailUser(String email, String risk_name, String ds_name){
        String subject = "New Risk Alert";
        String body = "A new risk named:\n" + risk_name + "\nHas been found in connection to Datascope:\n" + ds_name;
        emailService.sendEmail(email, subject, body);
    }

    private void reviewEmail(String email, String risk_name, String ds_name, String status){
        String subject = "Risk Reviewed";
        String body = "Risk named: \n" + risk_name + "\nAssociated with Datascope:" + ds_name + "\ndHas been set to risk status: " + status;
        emailService.sendEmail(email, subject, body);
    }
}
