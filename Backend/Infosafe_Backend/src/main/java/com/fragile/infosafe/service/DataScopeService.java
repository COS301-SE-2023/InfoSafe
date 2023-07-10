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
                .description(request.getDescription())
                .role_name(request.getRole_name())
                .role_description(request.getRole_description())
                .date_captured(request.getDate_captured())
                .data_custodian(request.getData_custodian())
                .administrator(request.getAdministrator())
                .status(request.getStatus())
                .build();
        dataScopeRepository.save(datascope);
        return ResponseEntity.status(HttpStatus.OK).body("added");
    }

    public List<DataScope> getAllDatascopes() {return dataScopeRepository.findAll();}

}
