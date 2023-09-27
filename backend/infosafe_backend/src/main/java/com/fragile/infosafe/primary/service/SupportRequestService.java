package com.fragile.infosafe.primary.service;

import com.fragile.infosafe.primary.model.*;
import com.fragile.infosafe.primary.repository.*;
import com.fragile.infosafe.primary.requests.ReviewRequest;
import com.fragile.infosafe.primary.requests.SupportRequestRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
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
    private final DeleteService deleteService;
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

    public SupportRequest updateSupportRequest(SupportRequestRequest supportRequest) {
        if(supportRequest.getSupport_status().equals("Resolved")){
            ReviewRequest request = new ReviewRequest();
            request.setRequest_id(supportRequest.getSupport_id());
            request.setSupportType(supportRequest.getSupport_type());
            switch(supportRequest.getSupport_type()) {
                case "Datascope Support" -> {
                    request.setDataScope_id(supportRequest.getDataScope_id());
                }
                case "Asset Support" -> {
                    request.setAsset_id(supportRequest.getAsset_id());
                }
                case  "Task Support" -> {
                    request.setTask_id(supportRequest.getTask_id());
                }
            }
            request.setUser_email(supportRequest.getUser_email());
            request.setReview(true);
            reviewSupportRequest(request);
            return null;
        }
        SupportRequest updated = supportRequestRepository.findById(supportRequest.getSupport_id()).get();
        updated.setSupport_description(supportRequest.getSupport_description());
        updated.setSupport_status(supportRequest.getSupport_status());
        updated.setSupport_type(supportRequest.getSupport_type());
        updated.setUser_id(userRepository.findByEmail(supportRequest.getUser_email()).isPresent() ? userRepository.findByEmail(supportRequest.getUser_email()).get() :null);
        updated.setTask_id(taskRepository.findByTaskId(supportRequest.getTask_id()).isPresent() ? taskRepository.findByTaskId(supportRequest.getTask_id()).get() : null);
        updated.setAsset_id(assetRepository.findByAssetId(supportRequest.getAsset_id()).isPresent() ? assetRepository.findByAssetId(supportRequest.getAsset_id()).get() : null);
        updated.setDataScope_id(dataScopeRepository.findByDataScopeId(supportRequest.getDataScope_id()).isPresent() ? dataScopeRepository.findByDataScopeId(supportRequest.getDataScope_id()).get() : null);
        return supportRequestRepository.save(updated);
    }

    public List<SupportRequest> getUserSupportRequests(int user_id) {
        return supportRequestRepository.findByUser_id(user_id);
    }

    public ResponseEntity<String> reviewSupportRequest(ReviewRequest reviewRequest) {
        if (reviewRequest.isReview()) {
            Optional<User> userOptional = userRepository.findByEmail(reviewRequest.getUser_email());
            switch (reviewRequest.getSupportType()) {
                case "DataScope Support" -> {
                    Optional<DataScope> dataScope = dataScopeRepository.findById(reviewRequest.getDataScope_id());
                    if (dataScope.isPresent() && userOptional.isPresent()) {
                        dataScope.get().getUsers().add(userOptional.get());
                        deleteService.deleteSupportRequestAndSaveToSecondary(reviewRequest.getRequest_id());
                        return ResponseEntity.ok("User given support to datascope");
                    } else {
                        deleteService.deleteSupportRequestAndSaveToSecondary(reviewRequest.getRequest_id());
                        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("couldn't find datascope or user");
                    }
                }
                case "Asset Support" -> {
                    Optional<Asset> asset = assetRepository.findByAssetId(reviewRequest.getAsset_id());
                    if (asset.isPresent() && userOptional.isPresent()) {
                        asset.get().setCurrent_assignee(userOptional.get());
                        deleteService.deleteSupportRequestAndSaveToSecondary(reviewRequest.getRequest_id());
                        return ResponseEntity.ok("User given support to Asset");
                    } else {
                        deleteService.deleteSupportRequestAndSaveToSecondary(reviewRequest.getRequest_id());
                        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("couldn't find asset or user");
                    }
                }
                case "Task Support" -> {
                    Optional<Task> task = taskRepository.findByTaskId(reviewRequest.getTask_id());
                    if (task.isPresent() && userOptional.isPresent()) {
                        task.get().getUsers().add(userOptional.get());
                        deleteService.deleteSupportRequestAndSaveToSecondary(reviewRequest.getRequest_id());
                        return ResponseEntity.ok("User given support to Task");
                    } else {
                        deleteService.deleteSupportRequestAndSaveToSecondary(reviewRequest.getRequest_id());
                        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("couldn't find task or user");
                    }
                }
            }
        } else {
            deleteService.deleteSupportRequestAndSaveToSecondary(reviewRequest.getRequest_id());
            return ResponseEntity.ok("rejected access");
        }
        return ResponseEntity.badRequest().build();
    }

    public Long getTotalSupportRequests() {
        return supportRequestRepository.count();
    }

    public Long getMyTotalSupportRequests(User user) {
        return supportRequestRepository.countSupportRequestByUser(user);
    }
}
