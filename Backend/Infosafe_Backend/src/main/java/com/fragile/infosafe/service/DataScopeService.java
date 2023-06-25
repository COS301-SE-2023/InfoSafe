package com.fragile.infosafe.service;

import com.fragile.infosafe.model.DataScope;

import java.util.List;

public interface DataScopeService {
    public DataScope saveDataScope(DataScope datascope);
    public List<DataScope> getAllDatascopes();
}
