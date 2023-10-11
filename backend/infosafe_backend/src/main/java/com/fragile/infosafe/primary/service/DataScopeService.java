package com.fragile.infosafe.primary.service;

import com.fragile.infosafe.primary.model.DataScope;
import com.fragile.infosafe.primary.model.User;
import com.fragile.infosafe.primary.repository.DataScopeRepository;
import com.fragile.infosafe.primary.repository.UserRepository;
import com.fragile.infosafe.primary.requests.DataScopeRequest;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class DataScopeService {
    private final DataScopeRepository dataScopeRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;
    private final NotificationsService notificationsService;
    private final EncryptionService encryptionService;

    public ResponseEntity<String> makeDs(DataScopeRequest request, User authenticatedUser){
        Set<User> dc = new HashSet<>();
        dc.add(authenticatedUser);
        var datascope = DataScope.builder()
                .ds_name(request.getDs_name())
                .ds_description(request.getDs_description())
                .date_captured(request.getDate_captured())
                .ds_status(request.getDs_status())
                .dataCustodian(authenticatedUser)
                .users(dc)
                .build();
        if(!request.getUser_email().isEmpty()){
            for(String email : request.getUser_email()){
                datascope.getUsers().add(userRepository.findByEmail(encryptionService.encryptString(email)).get());
                emailUser(email, datascope.getDs_name());
                notificationsService.makeNotification("Assign to Datascope: " + datascope.getDs_name(), userRepository.findByEmail(encryptionService.encryptString(email)).get());
            }
        }
        dataScopeRepository.save(datascope);
        return ResponseEntity.status(HttpStatus.OK).body("added");
    }

    public List<DataScope> getAllDatascopes() {return dataScopeRepository.findAll();}

    public DataScope updateDataScope(DataScopeRequest request) {
        Optional<DataScope> entityOptional = dataScopeRepository.findByDataScopeId(request.getData_scope_id());
        if(entityOptional.isPresent()){
            DataScope datascope = entityOptional.get();
            datascope.setDs_name(request.getDs_name());
            datascope.setDs_description(request.getDs_description());
            datascope.setDs_status(request.getDs_status());
            datascope.setDataCustodian(userRepository.findById(request.getData_custodian()).get());
            return dataScopeRepository.save(datascope);
        }
        return null;
    }

    public boolean checkDataScopeExists(String name) {
        return dataScopeRepository.existsByds_name(name);
    }

    public long getTotalDs() {return dataScopeRepository.count();}

    public List<DataScope> getDataScopesNotAssociatedWithUser(User user) {
        return dataScopeRepository.findDataScopesNotAssociatedWithUser(user);
    }

    public List<String> getAllUsersOfDatascope(int ds_id){
        Optional<DataScope> entityOptional = dataScopeRepository.findByDataScopeId(ds_id);
        if(entityOptional.isPresent()){
            DataScope dataScope = entityOptional.get();
            List<String> emails = new ArrayList<>();
            for(User user : dataScope.getUsers()){
                emails.add(encryptionService.decryptString(user.getEmail()));
            }
            return emails;
        }
        return null;
    }

    public String getDataCustodian(int ds_id){
        Optional<DataScope> entityOptional = dataScopeRepository.findByDataScopeId(ds_id);
        if(entityOptional.isPresent()){
            return encryptionService.decryptString(entityOptional.get().getDataCustodian().getEmail());
        }
        return null;
    }

    public List<DataScope> getDataScopesByUser(User user) {
        return dataScopeRepository.findAllByUsers(user);
    }

    public long countDataScopesForUser(User user){
        return dataScopeRepository.countDataScopesByUsersContains(user);
    }

    private void emailUser(String email, String ds_name){
        String subject = "Assigned to Datascope";
        String body = "You were assigned to the Datascope:\n" + ds_name;
        emailService.sendEmail(email, subject, body);
    }
}
