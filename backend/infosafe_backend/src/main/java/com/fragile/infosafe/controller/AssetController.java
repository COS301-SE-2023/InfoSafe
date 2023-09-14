package com.fragile.infosafe.controller;

import com.fragile.infosafe.model.Asset;
import com.fragile.infosafe.requests.AssetRequest;
import com.fragile.infosafe.service.AssetService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@Slf4j
@RestController
@RequestMapping("api/asset")
@RequiredArgsConstructor
public class AssetController {
    private final AssetService service;
    @PostMapping("/addAsset")
    public ResponseEntity addAsset(@RequestBody AssetRequest asset) {
        log.info("Adding an asset");
        return ResponseEntity.ok(service.makeAsset(asset));
    }

    @GetMapping("/getAsset")
    public List<Asset> assetlist() { return service.getAllAssets(); }

    @PutMapping("/update/{id}")
    public Asset updateAsset (@PathVariable("id") int asset_id, @RequestBody Asset asset) {
        asset.setAsset_id(asset_id);
        return service.updateAsset(asset);
    }
}