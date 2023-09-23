package com.fragile.infosafe.primary.service;

import com.fragile.infosafe.primary.model.SupportRequest;
import com.fragile.infosafe.primary.model.User;
import com.fragile.infosafe.primary.repository.SupportRequestRepository;
import com.fragile.infosafe.primary.repository.UserRepository;
import com.fragile.infosafe.primary.requests.SupportRequestRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class SupportRequestService {
    private final SupportRequestRepository supportRequestRepository;
    private final UserRepository userRepository;
    public ResponseEntity<String> makeSR(SupportRequestRequest request){
        var supportrequest = SupportRequest.builder()
                .support_id(request.getSupport_id())
                .support_type(request.getSupport_type())
                .support_description(request.getSupport_description())
                .support_status(request.getSupport_status())
                .build();

        if (!request.getUser_email().isEmpty()) {
            User user = userRepository.findByEmail(request.getUser_email()).orElse(null);
            if (user != null) {
                supportrequest.setUser_id(user);
            } else {
                log.error("User with email " + request.getUser_email() + " not found");
            }
        }
        supportRequestRepository.save(supportrequest);
        return ResponseEntity.status(HttpStatus.OK).body("added");
    }

    public List<SupportRequest> getAllSupportRequests() {return supportRequestRepository.findAll();}

    public SupportRequest updateSupportRequest(SupportRequest supportRequest) {return supportRequestRepository.save(supportRequest);}

    public List<SupportRequest> getUserSupportRequests(int user_id) {
        return supportRequestRepository.findByUser_id(user_id);
    }
}
