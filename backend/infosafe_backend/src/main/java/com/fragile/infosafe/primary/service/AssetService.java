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

@Service
@RequiredArgsConstructor
@Slf4j
public class AssetService {
    private final AssetRepository assetRepository;
    private final UserRepository userRepository;
    public List<Asset> getAllAssets() {return assetRepository.findAll();}

    public Asset updateAsset(AssetRequest asset) {
        if(assetRepository.findByAssetId(asset.getAsset_id()).isPresent()) {
            Asset editAsset = assetRepository.findByAssetId(asset.getAsset_id()).get();
            User current = userRepository.findByEmail(asset.getCurrent_assignee()).get();
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
                //.previous_assignee(request.getPrevious_assignee())
                .used(request.getUsed())
                .build();

        if (request.getCurrent_assignee() != null) {
            User user = userRepository.findByEmail(request.getCurrent_assignee()).orElse(null);
            if (user != null) {
                asset.setCurrent_assignee(user);
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
}
