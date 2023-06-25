package com.fragile.infosafe.service;

import com.fragile.infosafe.model.Asset;

import java.util.List;

public interface AssetService {
    public Asset saveAsset(Asset asset);
    public List<Asset> getAllAssets();
}
