package com.fragile.infosafe.primary.service;

import com.fragile.infosafe.primary.model.DataScope;
import com.fragile.infosafe.primary.model.User;
import com.fragile.infosafe.primary.repository.DataScopeRepository;
import com.fragile.infosafe.primary.repository.UserRepository;
import com.fragile.infosafe.primary.requests.DataScopeRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class DataScopeService {
    private final DataScopeRepository dataScopeRepository;
    private final UserRepository userRepository;

    public ResponseEntity<String> makeDs(DataScopeRequest request){
        var datascope = DataScope.builder()
                .ds_name(request.getDs_name())
                .ds_description(request.getDs_description())
                .date_captured(request.getDate_captured())
                .ds_status(request.getDs_status())
                .build();
        User user = userRepository.findById(request.getData_custodian()).orElse(null);
        if (user != null) {
            datascope.setData_custodian(user);
        } else {
            log.error("User with email " + request.getData_custodian() + " not found");
        }
        dataScopeRepository.save(datascope);
        return ResponseEntity.status(HttpStatus.OK).body("added");
    }

    public List<DataScope> getAllDatascopes() {return dataScopeRepository.findAll();}

    public DataScope updateDataScope(DataScope dataScope) {return dataScopeRepository.save(dataScope);}

    public boolean checkDataScopeExists(String name) {
        return dataScopeRepository.existsByds_name(name);
    }

    public long getTotalDs() {return dataScopeRepository.count();}
}
