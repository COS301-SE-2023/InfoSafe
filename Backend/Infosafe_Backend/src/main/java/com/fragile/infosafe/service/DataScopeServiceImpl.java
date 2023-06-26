package com.fragile.infosafe.service;

import com.fragile.infosafe.model.DataScope;
import com.fragile.infosafe.repository.DataScopeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DataScopeServiceImpl implements DataScopeService {
    @Autowired
    private DataScopeRepository datascopeRepository;


}
