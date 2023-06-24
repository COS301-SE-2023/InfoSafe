package com.example.infosafe_backend.service;

import com.example.infosafe_backend.model.Asset;

import java.util.List;

public interface AssetService {
    public Asset saveAsset(Asset asset);
    public List<Asset> getAllAssets();
}
