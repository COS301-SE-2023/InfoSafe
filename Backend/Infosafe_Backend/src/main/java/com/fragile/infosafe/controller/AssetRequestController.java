package com.fragile.infosafe.controller;

import com.fragile.infosafe.model_primary.AssetRequest;
import com.fragile.infosafe.requests.AssetRequestRequest;
import com.fragile.infosafe.service.AssetRequestService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@Slf4j
@RestController
@RequestMapping("api/assetrequest")
@RequiredArgsConstructor
//@CrossOrigin
public class AssetRequestController {
    private final AssetRequestService service;
    @PostMapping("/addAr")
    public ResponseEntity addAr(@RequestBody AssetRequestRequest assetrequest) {
        ResponseEntity<String> response = service.makeAR(assetrequest);

        if (response.getStatusCode() == HttpStatus.OK) {
            log.info("Adding an asset request");
            return ResponseEntity.status(HttpStatus.OK).body("AssetRequest created.");
        } else if (response.getStatusCode() == HttpStatus.CONFLICT) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("AssetRequest already exists.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating AssetRequest.");
        }
    }

    @GetMapping("/getAr")
    public List<AssetRequest> assetrequestlist() { return service.getAllAssetRequests(); }

    @PutMapping("/update/{id}")
    public AssetRequest updateAssetRequest (@PathVariable("id") int asset_request_id, @RequestBody AssetRequest assetRequest) {
        assetRequest.setAsset_request_id(asset_request_id);
        return service.updateAssetRequest(assetRequest);
    }
}
