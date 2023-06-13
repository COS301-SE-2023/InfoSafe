package com.example.infosafe_backend.service;

import com.example.infosafe_backend.model.DataScope;
import com.example.infosafe_backend.model.User;
import com.example.infosafe_backend.repository.DataScopeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DataScopeServiceImpl implements DataScopeService {
    @Autowired
    private DataScopeRepository datascopeRepository;

    @Override
    public DataScope saveDataScope(DataScope datascope) {
        return datascopeRepository.save(datascope);
    }
}
