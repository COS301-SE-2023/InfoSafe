package com.example.infosafe_backend.service;

import com.example.infosafe_backend.model.Asset;
import com.example.infosafe_backend.repository.AssetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AssetServiceImpl implements AssetService {
    @Autowired
    private AssetRepository assetRepository;

    @Override
    public Asset saveAsset(Asset asset) {
        return assetRepository.save(asset);
    }
}
