package com.fragile.infosafe.service;

import com.fragile.infosafe.model.AssetType;
import com.fragile.infosafe.repository.AssetTypeRepository;
import com.fragile.infosafe.requests.AssetTypeRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AssetTypeService {

    private final AssetTypeRepository atRepository;

    public List<AssetType> getAllAssetTypes() { return atRepository.findAll(); }

    public ResponseEntity<String> makeAssetType(AssetTypeRequest request){
        var assetType = AssetType.builder()
                .asset_type_id(request.getAsset_type_id())
                .type_name(request.getType_name())
                .build();
        atRepository.save(assetType);

        return ResponseEntity.status(HttpStatus.OK).body("Asset Type Added.");
    }
}
