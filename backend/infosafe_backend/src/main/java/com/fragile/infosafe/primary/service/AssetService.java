package com.fragile.infosafe.primary.service;

import com.fragile.infosafe.primary.model.Asset;
import com.fragile.infosafe.primary.model.User;
import com.fragile.infosafe.primary.repository.AssetRepository;
import com.fragile.infosafe.primary.repository.UserRepository;
import com.fragile.infosafe.primary.requests.AssetRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class AssetService {
    private final AssetRepository assetRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;
    private final NotificationsService notificationsService;
    public List<Asset> getAllAssets() {return assetRepository.findAll();}

    public Asset updateAsset(AssetRequest asset) {
        if(assetRepository.findByAssetId(asset.getAsset_id()).isPresent()) {
            Asset editAsset = assetRepository.findByAssetId(asset.getAsset_id()).get();
            User current = userRepository.findByEmail(asset.getCurrent_assignee()).get();
            if(current != editAsset.getCurrent_assignee()){
                sendEmail(current.getEmail(), editAsset.getAsset_name());
                notificationsService.makeNotification("Assigned Asset: " + editAsset.getAsset_name(), current);
            }
            Optional<User> previous = userRepository.findByEmail(asset.getPrevious_assignee());
            previous.ifPresent(editAsset::setPrevious_assignee);
            editAsset.setAsset_description(asset.getAsset_description());
            editAsset.setAsset_name(asset.getAsset_name());
            editAsset.setAsset_description(asset.getAsset_description());
            editAsset.setStatus(asset.getStatus());
            editAsset.setUsed(asset.getUsed());
            editAsset.setDevice_type(asset.getDevice_type());
            editAsset.setCurrent_assignee(current);
            return assetRepository.save(editAsset);
        }
        return null;
    }


    public ResponseEntity<String> makeAsset(AssetRequest request){
        var asset = Asset.builder()
                .asset_name(request.getAsset_name())
                .asset_description(request.getAsset_description())
                .status(request.getStatus())
                .availability(request.getAvailability())
                .device_type(request.getDevice_type())
                .used(request.getUsed())
                .build();

        if (request.getCurrent_assignee() != null) {
            User user = userRepository.findByEmail(request.getCurrent_assignee()).orElse(null);
            if (user != null) {
                asset.setCurrent_assignee(user);
                sendEmail(user.getEmail(), request.getAsset_name());
                notificationsService.makeNotification("Assigned Asset: " + request.getAsset_name(), user);
            } else {
                log.error("User with email " + request.getCurrent_assignee() + " not found");
            }
        }
//        else{
//            asset.setCurrent_assignee(request.getCurrent_assignee());
//        }

        assetRepository.save(asset);
        return ResponseEntity.status(HttpStatus.OK).body("added");
    }

    public long getTotalDevicesAssignedToAssignee(User assignee) {
        return assetRepository.countByCurrentAssignee(assignee);
    }

    public List<Asset> getDevicesAssignedToUser(User assignee) {
        return assetRepository.findByCurrentAssignee(assignee);
    }

    public List<Asset> getAssetsWithAvailabilityYes() {
        return assetRepository.findAllByAvailability("Yes");
    }

    public long getTotalDevice() {
        return assetRepository.count();
    }

    public List<String> getUnassignedUserEmails(String currentAssignee, int assetId) {
        return assetRepository.findEmailsOfUsersNotAssignedToAsset(userRepository.findByEmail(currentAssignee).get(), assetId);
    }

    private void sendEmail(String email, String assetName){
        String subject = "Asset Assigned";
        String body = "You were assigned the asset :" + assetName;
        emailService.sendEmail(email, subject, body);
    }

}
