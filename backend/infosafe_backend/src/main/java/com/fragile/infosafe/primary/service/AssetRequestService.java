package com.fragile.infosafe.primary.service;

import com.fragile.infosafe.primary.model.AccessRequest;
import com.fragile.infosafe.primary.model.Asset;
import com.fragile.infosafe.primary.model.AssetRequests;
import com.fragile.infosafe.primary.model.User;
import com.fragile.infosafe.primary.repository.AssetRepository;
import com.fragile.infosafe.primary.repository.AssetRequestRepository;
import com.fragile.infosafe.primary.repository.UserRepository;
import com.fragile.infosafe.primary.requests.AssetRequestRequest;
import com.fragile.infosafe.primary.requests.ReviewRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.identitystore.model.Email;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Optional;

import static org.springframework.jdbc.support.JdbcUtils.isNumeric;

@Service
@RequiredArgsConstructor
@Slf4j

public class AssetRequestService {
    private final AssetRequestRepository assetRequestRepository;
    private final UserRepository userRepository;
    private final AssetRepository assetRepository;
    private final DeleteService deleteService;
    private final EmailService emailService;
    private final NotificationsService notificationsService;
    private final EncryptionService encryptionService;

    public ResponseEntity<String> makeAR(AssetRequestRequest request, User authenticatedUser) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        String dueDate = dateFormat.format(request.getDesired_date());
        AssetRequests assetRequests = AssetRequests.builder()
                .reason(request.getReason())
                .desired_date(dueDate)
                .request_status(request.getRequest_status())
                .user(authenticatedUser)
                .build();

        Optional<Asset> asset = assetRepository.findByAssetId(request.getAsset_id());
        if (asset.isPresent()) {
            assetRequests.setAsset(asset.get());
        } else {
            log.error("Asset with " + request.getAsset_id() + " not found");
        }
        assetRequestRepository.save(assetRequests);
        return ResponseEntity.status(HttpStatus.OK).body("added");
    }

    public List<AssetRequests> getAllAssetRequests() {
        List<AssetRequests> ar = assetRequestRepository.findAll();
        for (AssetRequests assetRequests : ar) {
            assetRequests.getUser().setFirst_name(encryptionService.decryptString(assetRequests.getUser().getFirst_name()));
            assetRequests.getUser().setLast_name(encryptionService.decryptString(assetRequests.getUser().getLast_name()));
        }
        return ar;
    }

    public AssetRequests updateAssetRequest(AssetRequests assetRequests) {
        return assetRequestRepository.save(assetRequests);
    }

    public boolean checkAssetRequestExists(int userId, int assetId) {
        return assetRequestRepository.existsByUserIdAndAssetId(userId, assetId);
    }

    public ResponseEntity<String> reviewAssetRequest(ReviewRequest reviewRequest) {
        if (reviewRequest.isReview()) {
            Optional<Asset> assetOptional = assetRepository.findByAssetId(reviewRequest.getAsset_id());
            Optional<User> userOptional = userRepository.findByEmail(reviewRequest.getUser_email());
            if (assetOptional.isPresent() && userOptional.isPresent()) {
                System.out.println("Doing this");
                Asset asset = assetOptional.get();
                User user = userOptional.get();
                asset.setAvailability("No");
                asset.setCurrent_assignee(user);
                assetRepository.save(asset);
                emailUser(encryptionService.decryptString(reviewRequest.getUser_email()), asset.getAsset_name(), "Approved");
                notificationsService.makeNotification("Received Asset " + asset.getAsset_name(), user);
                deleteService.deleteAssetRequestAndSaveToSecondary(reviewRequest.getRequest_id());
                return ResponseEntity.ok("given to user");
            }
        } else {
            deleteService.deleteAssetRequestAndSaveToSecondary(reviewRequest.getRequest_id());
            emailUser(reviewRequest.getUser_email(), "", "Denied");
            notificationsService.makeNotification("Asset Request Denied", userRepository.findByEmail(reviewRequest.getUser_email()).get());
            return ResponseEntity.ok("rejected access");
        }
        return ResponseEntity.badRequest().build();
    }

    public Long getTotalAssetRequests() {
        return assetRequestRepository.count();
    }

    public Long getMyTotalAssetRequests(User user) {
        return assetRequestRepository.countAssetRequestsByUser(user);
    }

    private void emailUser(String email, String asset_name, String status) {
        try {
            String subject = "Asset Request response";
            String body = "Your request to get an asset \n" + asset_name + "\nwas " + status;
            emailService.sendEmail(email, subject, body);
        } catch (Exception e) {
            throw (e);
        }
    }
}