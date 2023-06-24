package com.example.infosafe_backend.controller;

import com.example.infosafe_backend.model.Asset;
import com.example.infosafe_backend.service.AssetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/asset")
@CrossOrigin
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
