package com.fragile.infosafe.service;

import com.fragile.infosafe.model.AssignedAsset;
import com.fragile.infosafe.repository.AssignedAssetRepository;
import com.fragile.infosafe.requests.AssignedAssetRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AssignedAssetService {

    private final AssignedAssetRepository aaRepository;

    public List<AssignedAsset> getAllAssignedAssets() { return aaRepository.findAll(); }

    public ResponseEntity<String> createAssignedAsset(AssignedAssetRequest aaRequest){
        var assignedAsset = AssignedAsset.builder()
                .asset_id(aaRequest.getAsset_id())
                .user_id(aaRequest.getUser_id())
                .build();
        aaRepository.save(assignedAsset);
        return ResponseEntity.status(HttpStatus.OK).body("Created Assigned Asset.");
    }
}
