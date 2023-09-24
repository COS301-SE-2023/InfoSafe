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

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Slf4j
public class AccessRequestService {
    private final AccessRequestRepository accessRequestRepository;
    private final UserRepository userRepository;
    private final DataScopeRepository dataScopeRepository;

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
        return accessRequestRepository.findAll();
    }

    public AccessRequest updateAccessRequest(AccessRequest accessRequest) {
        return accessRequestRepository.save(accessRequest);
    }

    public ResponseEntity<String> reviewAccessRequest(ReviewRequest reviewRequest) {
        if (reviewRequest.isReview()) {
            Optional<DataScope> dataScopeOptional = dataScopeRepository.findByDataScopeId(reviewRequest.getDataScope_id());
            Optional<User> userOptional = userRepository.findByEmail(reviewRequest.getUser_email());
            if (dataScopeOptional.isPresent() && userOptional.isPresent()) {
                DataScope dataScope = dataScopeOptional.get();
                User user = userOptional.get();

                if (!dataScope.getUsers().contains(user)) {
                    dataScope.getUsers().add(user);
                    dataScopeRepository.save(dataScope);
                    // delete request
                    return ResponseEntity.ok("given to user");
                } else {
                    // delete request
                    return ResponseEntity.ok("user already has access"); // You can customize this response as needed
                }
            }
        } else {
            // delete request
            return ResponseEntity.ok("rejected access");
        }
        return ResponseEntity.badRequest().build();
    }


}
