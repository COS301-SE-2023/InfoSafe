package com.example.infosafe_backend.controller;

import com.example.infosafe_backend.model.Asset;
import com.example.infosafe_backend.service.AssetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/asset")
public class AssetController {
    @Autowired
    private AssetService assetService;

    @PostMapping("/add")
    public String add(@RequestBody Asset asset){
        assetService.saveAsset(asset);
        return "New asset is added";
    }

}
