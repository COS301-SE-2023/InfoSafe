package com.fragile.infosafe.service;

import com.fragile.infosafe.model.Asset;
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

    public List<Asset> getAllAssets() {
        return assetRepository.findAll();
    }

    public ResponseEntity<String> makeAsset(AssetRequest request){
        var asset = Asset.builder()
                .serial_number(request.getSerial_number())
                .type_id(request.getType_id())
                .asset_description(request.getAsset_description())
                .clean_status(request.getClean_status())
                .availability(request.getAvailability())
                .new_device(request.getNew_device())
                .build();
        assetRepository.save(asset);
        return ResponseEntity.status(HttpStatus.OK).body("added");
    }

}
