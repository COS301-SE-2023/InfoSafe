package com.fragile.infosafe.controller;

import com.fragile.infosafe.model.AssetType;
import com.fragile.infosafe.requests.AssetTypeRequest;
import com.fragile.infosafe.service.AssetTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/assetType")
@RequiredArgsConstructor
public class AssetTypeController {

    private final AssetTypeService atService;

    @PostMapping("/addAssetType")
    public ResponseEntity addAssetType(@RequestBody AssetTypeRequest atRequest){
        return ResponseEntity.ok(atService.makeAssetType(atRequest));
    }

    @GetMapping("/getAssetType")
    public List<AssetType> list() { return atService.getAllAssetTypes(); }
}
