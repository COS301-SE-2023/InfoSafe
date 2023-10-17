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

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class AssetService {
    private final AssetRepository assetRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;
    private final NotificationsService notificationsService;
    private final EncryptionService encryptionService;

    public List<Asset> getAllAssets() {
        List<Asset> assets = assetRepository.findAll();
        for (Asset asset : assets) {
            if (asset.getCurrent_assignee() != null) {
                User currentAssignee = asset.getCurrent_assignee();
                User decryptedCurrentAssignee = new User();
                decryptedCurrentAssignee.setUser_id(currentAssignee.getUser_id());
                decryptedCurrentAssignee.setFirst_name(encryptionService.decryptString(currentAssignee.getFirst_name()));
                decryptedCurrentAssignee.setLast_name(encryptionService.decryptString(currentAssignee.getLast_name()));
                decryptedCurrentAssignee.setRole(currentAssignee.getRole());
                asset.setCurrent_assignee(decryptedCurrentAssignee);
            }
            if (asset.getPrevious_assignee() != null) {
                User previousAssignee = asset.getPrevious_assignee();
                User decryptedPreviousAssignee = new User();
                decryptedPreviousAssignee.setUser_id(previousAssignee.getUser_id());
                decryptedPreviousAssignee.setFirst_name(encryptionService.decryptString(previousAssignee.getFirst_name()));
                decryptedPreviousAssignee.setLast_name(encryptionService.decryptString(previousAssignee.getLast_name()));
                decryptedPreviousAssignee.setRole(previousAssignee.getRole());
                asset.setPrevious_assignee(decryptedPreviousAssignee);
            }
        }
        return assets;
    }


    public Asset updateAsset(AssetRequest asset) {
        if(assetRepository.findByAssetId(asset.getAsset_id()).isPresent()) {
            Asset editAsset = assetRepository.findByAssetId(asset.getAsset_id()).get();
            User current = userRepository.findByEmail(encryptionService.encryptString(asset.getCurrent_assignee())).get();
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
                .previous_assignee(null)
                .build();

        if (request.getCurrent_assignee() != null) {
            User user = userRepository.findByEmail(encryptionService.encryptString(request.getCurrent_assignee())).orElse(null);
            if (user != null) {
                asset.setCurrent_assignee(user);
                emailUser(encryptionService.decryptString(user.getEmail()), asset.getAsset_name());
                notificationsService.makeNotification("Assigned Asset " + asset.getAsset_name(), user);
            } else {
                log.error("User with email " + request.getCurrent_assignee() + " not found");
            }
        }

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

    public List<String> getUnassignedUserEmails(int assetId) {
        Asset asset = assetRepository.findByAssetId(assetId).get();
        List<String> emails = new ArrayList<>();
        if(asset.getCurrent_assignee() == null){
            emails = userRepository.getAllEmails();
        }else{
            emails = assetRepository.findEmailsOfUsersNotAssignedToAsset(userRepository.findByEmail(asset.getCurrent_assignee().getEmail()).get(), assetId);
        } emails.replaceAll(encryptionService::decryptString);
        return emails;
    }

    private void emailUser(String email, String asset_name){
        String subject = "New Asset";
        String body = "You were assigned the Asset:\n" + asset_name;
        emailService.sendEmail(email, subject, body);
    }
}
