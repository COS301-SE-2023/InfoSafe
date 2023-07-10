package com.fragile.infosafe.controller;

import com.fragile.infosafe.model.Asset;
import com.fragile.infosafe.requests.AssetRequest;
import com.fragile.infosafe.service.AssetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/asset")
@RequiredArgsConstructor
public class AssetController {
    private final AssetService service;
    @PostMapping("/addAsset")
    public ResponseEntity addAsset(@RequestBody AssetRequest asset){
        return ResponseEntity.ok(service.makeAsset(asset));
    }

    @GetMapping("/getAsset")
    public List<Asset> list() { return service.getAllAssets(); }
}
