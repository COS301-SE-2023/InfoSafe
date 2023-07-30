package com.fragile.infosafe.service;

import com.fragile.infosafe.model.DataScope;
import com.fragile.infosafe.repository.DataScopeRepository;
import com.fragile.infosafe.requests.DataScopeRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DataScopeService {
    private final DataScopeRepository dataScopeRepository;

    public ResponseEntity<String> makeDs(DataScopeRequest request){
        var datascope = DataScope.builder()
                .ds_name(request.getDs_name())
                .ds_description(request.getDs_description())
                .date_captured(request.getDate_captured())
                .data_custodian(request.getData_custodian())
                .ds_status(request.getDs_status())
                .build();
        dataScopeRepository.save(datascope);
        return ResponseEntity.status(HttpStatus.OK).body("added");
    }

    public List<DataScope> getAllDatascopes() {return dataScopeRepository.findAll();}

    public DataScope updateDataScope(DataScope dataScope) {return dataScopeRepository.save(dataScope);}

    public boolean checkDataScopeExists(String name) {
        return dataScopeRepository.existsByDs_name(name);
    }
}
