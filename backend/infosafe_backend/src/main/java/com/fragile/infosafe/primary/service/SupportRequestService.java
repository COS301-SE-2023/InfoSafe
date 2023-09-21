package com.fragile.infosafe.primary.service;

import com.fragile.infosafe.primary.model.SupportRequest;
import com.fragile.infosafe.primary.repository.SupportRequestRepository;
import com.fragile.infosafe.primary.requests.SupportRequestRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SupportRequestService {
    private final SupportRequestRepository supportRequestRepository;

    public ResponseEntity<String> makeSR(SupportRequestRequest request){
        var supportrequest = SupportRequest.builder()
                .support_id(request.getSupport_id())
                .user_id(request.getUser_id())
                .support_type(request.getSupport_type())
                .support_description(request.getSupport_description())
                .support_status(request.getSupport_status())
                .build();
        supportRequestRepository.save(supportrequest);
        return ResponseEntity.status(HttpStatus.OK).body("added");
    }

    public List<SupportRequest> getAllSupportRequests() {return supportRequestRepository.findAll();}

    public SupportRequest updateSupportRequest(SupportRequest supportRequest) {return supportRequestRepository.save(supportRequest);}

    public List<SupportRequest> getUserSupportRequests(int user_id) {
        return supportRequestRepository.findByUser_id(user_id);
    }
}
