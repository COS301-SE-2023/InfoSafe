package com.fragile.infosafe.controller;

import com.fragile.infosafe.model.Asset;
import com.fragile.infosafe.service.AssetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/asset")
public class AssetController {
    @Autowired
    private AssetService assetService;

    @PostMapping("/add")
    public String add(@RequestBody Asset asset){
        assetService.saveAsset(asset);
        return "New asset is added";
    }

    @GetMapping("/getAll")
    public List<Asset> list() { return assetService.getAllAssets(); }
}
