package com.fragile.infosafe.primary.service;

import com.fragile.infosafe.primary.model.AccessRequest;
import com.fragile.infosafe.primary.model.DataScope;
import com.fragile.infosafe.primary.model.User;
import com.fragile.infosafe.primary.repository.DataScopeRepository;
import com.fragile.infosafe.primary.repository.UserRepository;
import com.fragile.infosafe.primary.requests.AccessRequestRequest;
import com.fragile.infosafe.primary.repository.AccessRequestRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class AccessRequestService {
    private final AccessRequestRepository accessRequestRepository;
    private final UserRepository userRepository;
    private final DataScopeRepository dataScopeRepository;

    public ResponseEntity<String> makeAR(AccessRequestRequest request){
        AccessRequest accessRequest = AccessRequest.builder()
                .reason(request.getReason())
                .status(request.getStatus())
                .build();

        if (!request.getUser_email().isEmpty()) {
            User user = userRepository.findByEmail(request.getUser_email()).orElse(null);
            if (user != null) {
                accessRequest.setUser_id(user);
            } else {
                log.error("User with email " + request.getUser_email() + " not found");
            }
        }
        if (dataScopeRepository.findByDataScopeId(request.getDataScope_id()).isPresent()) {
            DataScope dataScope = dataScopeRepository.findByDataScopeId(request.getDataScope_id()).get();
            accessRequest.setData_scope_id(dataScope);
        }
        accessRequestRepository.save(accessRequest);
        return ResponseEntity.status(HttpStatus.OK).body("added");
    }

    public List<AccessRequest> getAllAccessRequests() {return accessRequestRepository.findAll();}

    public AccessRequest updateAccessRequest(AccessRequest accessRequest) {return accessRequestRepository.save(accessRequest);}

//    public boolean checkAccessRequestExists(int userId, int dsId) {
//        return accessRequestRepository.existsByUserIdAndDsId(userId, dsId);
//    }

}
