package com.fragile.infosafe.service;

import com.fragile.infosafe.model.AccessRequest;
import com.fragile.infosafe.repository.AccessRequestRepository;
import com.fragile.infosafe.requests.AccessRequestRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AccessRequestService {
    private final AccessRequestRepository accessRequestRepository;

    public ResponseEntity<String> makeAR(AccessRequestRequest request){
        int userId = request.getUser_id();
        int dsId = request.getDs_id();

        if (checkAccessRequestExists(userId, dsId)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("AccessRequest already exists.");
        }

        AccessRequest accessRequest = AccessRequest.builder()
                .user_id(userId)
                .ds_id(dsId)
                .reason(request.getReason())
                .status(request.getStatus())
                .build();

        accessRequestRepository.save(accessRequest);
        return ResponseEntity.status(HttpStatus.OK).body("added");
    }

    public List<AccessRequest> getAllAccessRequests() {return accessRequestRepository.findAll();}

    public AccessRequest updateAccessRequest(AccessRequest accessRequest) {return accessRequestRepository.save(accessRequest);}

    public boolean checkAccessRequestExists(int userId, int dsId) {
        return accessRequestRepository.existsByUserIdAndDsId(userId, dsId);
    }

}
