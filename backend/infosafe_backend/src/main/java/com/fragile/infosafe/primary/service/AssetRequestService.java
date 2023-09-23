package com.fragile.infosafe.primary.service;

import com.fragile.infosafe.primary.model.Asset;
import com.fragile.infosafe.primary.model.AssetRequest;
import com.fragile.infosafe.primary.model.User;
import com.fragile.infosafe.primary.repository.AssetRepository;
import com.fragile.infosafe.primary.repository.AssetRequestRepository;
import com.fragile.infosafe.primary.repository.UserRepository;
import com.fragile.infosafe.primary.requests.AssetRequestRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

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

    public ResponseEntity<String> makeAR(AssetRequestRequest request){
        AssetRequest assetRequest = AssetRequest.builder()
                .reason(request.getReason())
                .desired_date(request.getDesired_date())
                .request_status(request.getRequest_status())
                .build();

        if (!request.getUser_email().isEmpty()) {
            User user = userRepository.findByEmail(request.getUser_email()).orElse(null);
            if (user != null) {
                assetRequest.setUser(user);
            } else {
                log.error("User with email " + request.getUser_email() + " not found");
            }
        }
        if(isNumeric(request.getAsset_id())){
            Optional<Asset> asset = assetRepository.findByAssetId(request.getAsset_id());
            if(asset.isPresent()){
                assetRequest.setAsset(asset.get());
            }else {
                log.error("User with email " + request.getAsset_id() + " not found");
            }
        }
        assetRequestRepository.save(assetRequest);
        return ResponseEntity.status(HttpStatus.OK).body("added");
    }

    public List<AssetRequest> getAllAssetRequests() { return assetRequestRepository.findAll(); }

    public AssetRequest updateAssetRequest(AssetRequest assetRequest) {return assetRequestRepository.save(assetRequest);}

    public boolean checkAssetRequestExists(int userId, int assetId) {
        return assetRequestRepository.existsByUserIdAndAssetId(userId, assetId);
    }

}
