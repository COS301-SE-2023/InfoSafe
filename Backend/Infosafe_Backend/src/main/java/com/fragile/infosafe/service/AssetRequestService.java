package com.fragile.infosafe.service;

import com.fragile.infosafe.model.AssetRequest;
import com.fragile.infosafe.repository.AssetRequestRepository;
import com.fragile.infosafe.requests.AssetRequestRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AssetRequestService {
    private final AssetRequestRepository assetRequestRepository;

    public ResponseEntity<String> makeAR(AssetRequestRequest request){
        int userId = request.getUser_id();
        int assetId = request.getAsset_id();

        if (checkAssetRequestExists(userId, assetId)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("AssetRequest already exists.");
        }

        AssetRequest assetRequest = AssetRequest.builder()
                .user_id(userId)
                .asset_id(assetId)
                .reason(request.getReason())
                .desired_date(request.getDesired_date())
                .request_status(request.getRequest_status())
                .build();

        assetRequestRepository.save(assetRequest);
        return ResponseEntity.status(HttpStatus.OK).body("added");
    }

    public List<AssetRequest> getAllAssetRequests() { return assetRequestRepository.findAll(); }

    public AssetRequest updateAssetRequest(AssetRequest assetRequest) {return assetRequestRepository.save(assetRequest);}

    public boolean checkAssetRequestExists(int userId, int assetId) {
        return assetRequestRepository.existsByUserIdAndAssetId(userId, assetId);
    }

}
