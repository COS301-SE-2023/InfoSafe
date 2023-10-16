package com.fragile.infosafe.primary.service;

import com.fragile.infosafe.primary.model.AccessRequest;
import com.fragile.infosafe.primary.model.DataScope;
import com.fragile.infosafe.primary.model.User;
import com.fragile.infosafe.primary.repository.DataScopeRepository;
import com.fragile.infosafe.primary.repository.UserRepository;
import com.fragile.infosafe.primary.requests.AccessRequestRequest;
import com.fragile.infosafe.primary.repository.AccessRequestRepository;
import com.fragile.infosafe.primary.requests.ReviewRequest;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.autoconfigure.session.RedisSessionProperties;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class AccessRequestService {
    private final AccessRequestRepository accessRequestRepository;
    private final UserRepository userRepository;
    private final DataScopeRepository dataScopeRepository;
    private final DeleteService deleteService;

    private final EmailService emailService;
    private final NotificationsService notificationsService;
    private final EncryptionService encryptionService;
    public ResponseEntity<String> makeAR(AccessRequestRequest request, User authenticatedUser) {
        AccessRequest accessRequest = AccessRequest.builder()
                .reason(request.getReason())
                .status(request.getStatus())
                .user_id(authenticatedUser)
                .build();

        if (dataScopeRepository.findByDataScopeId(request.getDataScope_id()).isPresent()) {
            DataScope dataScope = dataScopeRepository.findByDataScopeId(request.getDataScope_id()).get();
            accessRequest.setData_scope_id(dataScope);
        }
        accessRequestRepository.save(accessRequest);
        return ResponseEntity.status(HttpStatus.OK).body("added");
    }

    public List<AccessRequest> getAllAccessRequests() {
        List<AccessRequest> ar = accessRequestRepository.findAll();
        for(AccessRequest accessRequest : ar){
            accessRequest.getUser_id().setFirst_name(encryptionService.decryptString(accessRequest.getUser_id().getFirst_name()));
            accessRequest.getUser_id().setLast_name(encryptionService.decryptString(accessRequest.getUser_id().getLast_name()));
        }
        return ar;
    }

    public AccessRequest updateAccessRequest(AccessRequest accessRequest) {
        return accessRequestRepository.save(accessRequest);
    }

    public ResponseEntity<String> reviewAccessRequest(ReviewRequest reviewRequest) {
        log.info(String.valueOf(reviewRequest));
        log.info(String.valueOf(reviewRequest.isReview()));
        if (reviewRequest.isReview()) {
            Optional<DataScope> dataScopeOptional = dataScopeRepository.findByDataScopeId(reviewRequest.getDataScope_id());
            Optional<User> userOptional = userRepository.findByEmail(reviewRequest.getUser_email());
            if (dataScopeOptional.isPresent() && userOptional.isPresent()) {
                DataScope dataScope = dataScopeOptional.get();
                User user = userOptional.get();

                if (!dataScope.getUsers().contains(user)) {
                    dataScope.getUsers().add(user);
                    dataScopeRepository.save(dataScope);
                    deleteService.deleteAccessRequestAndSaveToSecondary(reviewRequest.getRequest_id());
                    emailUser(encryptionService.decryptString(reviewRequest.getUser_email()), dataScope.getDs_name(), "Approved");
                    notificationsService.makeNotification("Added to Datascope " + dataScope.getDs_name(), user);
                    return ResponseEntity.ok("given to user");
                } else {
                    deleteService.deleteAccessRequestAndSaveToSecondary(reviewRequest.getRequest_id());
                    return ResponseEntity.ok("user already has access");
                }
            }
        } else {
            deleteService.deleteAccessRequestAndSaveToSecondary(reviewRequest.getRequest_id());
            emailUser(reviewRequest.getUser_email(), "", "Denied");
            String message = "rejected access";
            return ResponseEntity.ok(message);
        }
        return ResponseEntity.badRequest().build();
    }

    private void emailUser(String email, String ds_name, String status){
        try{
            String subject = "Access Request response";
            String body = "Your request to access the Datascope: " + ds_name + "was " + status;
            emailService.sendEmail(email, subject, body);
        } catch (Exception e){
            throw (e);
        }

    }

    public Long getTotalAccessRequests() {
        return accessRequestRepository.count();
    }

    public Long getMyTotalAccessRequests(User user) {
        return accessRequestRepository.countAccessRequestsByUser(user);
    }
}