package com.fragile.infosafe.service;

import com.fragile.infosafe.model.Asset;
import com.fragile.infosafe.model.SupportRequest;
import com.fragile.infosafe.repository.AssetRepository;
import com.fragile.infosafe.requests.AssetRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AssetService {
    private final AssetRepository assetRepository;

    public List<Asset> getAllAssets() {return assetRepository.findAll();}

    public Asset updateAsset(Asset asset) {return assetRepository.save(asset);}


    public ResponseEntity<String> makeAsset(AssetRequest request){
        var asset = Asset.builder()
                .assetName(request.getAssetName())
                .assetDescription(request.getAssetDescription())
                .status(request.getStatus())
                .dateAcquired(request.getDateAcquired())
                .assignee(request.getAssignee())
                .build();
        assetRepository.save(asset);
        return ResponseEntity.status(HttpStatus.OK).body("added");
    }

}
