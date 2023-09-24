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
import java.util.Set;

@Service
@RequiredArgsConstructor
@Slf4j
public class AssetService {
    private final AssetRepository assetRepository;
    private final UserRepository userRepository;
    public List<Asset> getAllAssets() {return assetRepository.findAll();}

    public Asset updateAsset(Asset asset) {return assetRepository.save(asset);}


    public ResponseEntity<String> makeAsset(AssetRequest request){
        var asset = Asset.builder()
                .asset_name(request.getAsset_name())
                .asset_description(request.getAsset_description())
                .status(request.getStatus())
                .availability(request.getAvailability())
                .device_type(request.getDevice_type())
                .used(request.getUsed())
                .build();

        if (!request.getCurrent_assignee().isEmpty()) {
                User user = userRepository.findByEmail(request.getCurrent_assignee()).orElse(null);
                if (user != null) {
                    asset.setCurrent_assignee(user);
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
}
