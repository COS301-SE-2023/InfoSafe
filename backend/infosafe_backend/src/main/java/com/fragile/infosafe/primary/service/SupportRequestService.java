package com.fragile.infosafe.primary.service;

import com.fragile.infosafe.primary.model.Asset;
import com.fragile.infosafe.primary.model.SupportRequest;
import com.fragile.infosafe.primary.model.User;
import com.fragile.infosafe.primary.repository.*;
import com.fragile.infosafe.primary.requests.ReviewRequest;
import com.fragile.infosafe.primary.requests.SupportRequestRequest;
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
public class SupportRequestService {
    private final SupportRequestRepository supportRequestRepository;
    private final UserRepository userRepository;
    private final DataScopeRepository dataScopeRepository;
    private final AssetRepository assetRepository;
    private final TaskRepository taskRepository;
    public ResponseEntity<String> makeSR(SupportRequestRequest request, User authenticatedUser){
        var supportrequest = SupportRequest.builder()
                .support_id(request.getSupport_id())
                .support_type(request.getSupport_type())
                .support_description(request.getSupport_description())
                .support_status(request.getSupport_status())
                .user_id(authenticatedUser)
                .build();

        switch (request.getSupport_type()) {
            case "Datascope Support" -> {
                if (dataScopeRepository.findById(request.getDataScope_id()).isPresent()) {
                    supportrequest.setDataScope_id(dataScopeRepository.findByDataScopeId(request.getDataScope_id()).get());
                } else {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("couldn't find datascope");
                }
            }
            case "Asset Support" -> {
                if (assetRepository.findByAssetId(request.getAsset_id()).isPresent()) {
                    supportrequest.setAsset_id(assetRepository.findByAssetId(request.getAsset_id()).get());
                } else {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("couldn't find asset");
                }
            }
            case "Task Support" -> {
                if (taskRepository.findByTaskId(request.getTask_id()).isPresent()) {
                    supportrequest.setTask_id(taskRepository.findByTaskId(request.getTask_id()).get());
                } else {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("couldn't find task");
                }
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

    public ResponseEntity<String> reviewSupportRequest(ReviewRequest reviewRequest) {
        if (reviewRequest.isReview()) {
            Optional<Asset> assetOptional = assetRepository.findByAssetId(reviewRequest.getAsset_id());
            Optional<User> userOptional = userRepository.findByEmail(reviewRequest.getUser_email());
            if (assetOptional.isPresent() && userOptional.isPresent()) {
                Asset asset = assetOptional.get();
                User user = userOptional.get();
                asset.setCurrent_assignee(user);
                assetRepository.save(asset);
                // delete request
                return ResponseEntity.ok("given to user");
            }
        } else {
            // delete request
            return ResponseEntity.ok("rejected access");
        }
        return ResponseEntity.badRequest().build();
    }
}
