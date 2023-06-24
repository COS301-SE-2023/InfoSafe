package com.example.infosafe_backend.service;

import com.example.infosafe_backend.model.DataScope;

import java.util.List;

public interface DataScopeService {
    public DataScope saveDataScope(DataScope datascope);
    public List<DataScope> getAllDatascopes();
}
