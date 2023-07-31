package com.fragile.infosafe.service;

import com.fragile.infosafe.model.AssetRequest;
import com.fragile.infosafe.model.SupportRequest;
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
        var assetrequest = AssetRequest.builder()
                .asset_request_id(request.getAsset_request_id())
                .user_id(request.getUser_id())
                .reason(request.getReason())
                .desired_date(request.getDesired_date())
                .request_status(request.getRequest_status())
                .build();
        assetRequestRepository.save(assetrequest);
        return ResponseEntity.status(HttpStatus.OK).body("added");
    }

    public List<AssetRequest> getAllAssetRequests() { return assetRequestRepository.findAll(); }

    public AssetRequest updateAssetRequest(AssetRequest assetRequest) {return assetRequestRepository.save(assetRequest);}

}
