package com.fragile.infosafe.service;

import com.fragile.infosafe.model.AssignedSupportRequest;
import com.fragile.infosafe.repository.AssignedSupportRequestRepository;
import com.fragile.infosafe.requests.AssignedSupportRequestRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AssignedSupportRequestService {

    private final AssignedSupportRequestRepository asrRepository;

    public List<AssignedSupportRequest> getAllAssignedSupportRequests() { return asrRepository.findAll(); }

    public ResponseEntity<String> createAssignedSupportRequest(AssignedSupportRequestRequest asrRequest){
        var assignedSupportRequest = AssignedSupportRequest.builder()
                .support_request_id(asrRequest.getSupport_request_id())
                .user_id(asrRequest.getUser_id())
                .build();
        asrRepository.save(assignedSupportRequest);
        return ResponseEntity.status(HttpStatus.OK).body("Created Assigned Support Request.");
    }
}
