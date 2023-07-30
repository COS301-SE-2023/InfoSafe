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
        var accessrequest = AccessRequest.builder()
                .request_id(request.getRequest_id())
                .user_id(request.getUser_id())
                .ds_id(request.getDs_id())
                .build();
        accessRequestRepository.save(accessrequest);
        return ResponseEntity.status(HttpStatus.OK).body("added");
    }

    public List<AccessRequest> getAllAccessRequests() {return accessRequestRepository.findAll();}

    public AccessRequest updateAccessRequest(AccessRequest accessRequest) {return accessRequestRepository.save(accessRequest);}


}
