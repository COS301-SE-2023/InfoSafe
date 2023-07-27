package com.fragile.infosafe.service;

import com.fragile.infosafe.model.SupportRequest;
import com.fragile.infosafe.repository.SupportRequestRepository;
import com.fragile.infosafe.requests.SupportRequestRequest;
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
                .asset_id(request.getAsset_id())
                .build();
        supportRequestRepository.save(supportrequest);
        return ResponseEntity.status(HttpStatus.OK).body("added");
    }

    public List<SupportRequest> getAllSupportRequests() {return supportRequestRepository.findAll();}

    public SupportRequest updateSupportRequest(SupportRequest supportRequest) {return supportRequestRepository.save(supportRequest);}
}
