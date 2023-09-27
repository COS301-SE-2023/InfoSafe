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

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Slf4j
public class DataScopeService {
    private final DataScopeRepository dataScopeRepository;
    private final UserRepository userRepository;

    public ResponseEntity<String> makeDs(DataScopeRequest request, User authenticatedUser){
        Set<User> dc = new HashSet<>();
        dc.add(authenticatedUser);
        var datascope = DataScope.builder()
                .ds_name(request.getDs_name())
                .ds_description(request.getDs_description())
                .date_captured(request.getDate_captured())
                .ds_status(request.getDs_status())
                .data_custodian(authenticatedUser)
                .users(dc)
                .build();
        if(!request.getUser_email().isEmpty()){
            for(String email : request.getUser_email()){
                datascope.getUsers().add(userRepository.findByEmail(email).get());
                // add email
            }
        }
        dataScopeRepository.save(datascope);
        return ResponseEntity.status(HttpStatus.OK).body("added");
    }

    public List<DataScope> getAllDatascopes() {return dataScopeRepository.findAll();}

    public DataScope updateDataScope(DataScope dataScope) {
        return dataScopeRepository.save(dataScope);
    }

    public boolean checkDataScopeExists(String name) {
        return dataScopeRepository.existsByds_name(name);
    }

    public long getTotalDs() {return dataScopeRepository.count();}

    public List<DataScope> getDataScopesNotAssociatedWithUser(User user) {
        return dataScopeRepository.findDataScopesNotAssociatedWithUser(user);
    }

    public List<DataScope> getDataScopesByUser(User user) {
        return dataScopeRepository.findAllByUsers(user);
    }
}
