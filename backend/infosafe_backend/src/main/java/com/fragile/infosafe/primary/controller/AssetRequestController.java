package com.fragile.infosafe.primary.controller;

import com.fragile.infosafe.primary.model.AssetRequests;
import com.fragile.infosafe.primary.model.User;
import com.fragile.infosafe.primary.requests.AssetRequestRequest;
import com.fragile.infosafe.primary.requests.ReviewRequest;
import com.fragile.infosafe.primary.service.AssetRequestService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
    public ResponseEntity addAr(@RequestBody AssetRequestRequest assetRequest) {
        log.info("Adding an asset request");
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof User authenticatedUser) {
            return ResponseEntity.ok(service.makeAR(assetRequest, authenticatedUser));
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/getAr")
    public List<AssetRequests> assetrequestlist() { return service.getAllAssetRequests(); }

    @PutMapping("/update/{id}")
    public AssetRequests updateAssetRequest (@PathVariable("id") int asset_request_id, @RequestBody AssetRequests assetRequests) {
        assetRequests.setAsset_request_id(asset_request_id);
        return service.updateAssetRequest(assetRequests);
    }

    @PostMapping("/reviewAsset")
    public ResponseEntity<String> reviewAssetRequest (@RequestBody ReviewRequest reviewRequest) {
        return service.reviewAssetRequest(reviewRequest);
    }

    @GetMapping("/getTotal")
    public ResponseEntity<Long> getTotalAssetRequests() {
        return ResponseEntity.ok(service.getTotalAssetRequests());
    }

    @GetMapping("/getMyTotal")
    public ResponseEntity<Long> getMyTotalAssetRequests() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof User authenticatedUser) {
            return ResponseEntity.ok(service.getMyTotalAssetRequests(authenticatedUser));
        }
        return ResponseEntity.ok(0L);
    }
}