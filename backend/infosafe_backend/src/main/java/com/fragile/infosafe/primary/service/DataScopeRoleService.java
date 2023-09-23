package com.fragile.infosafe.primary.service;

import com.fragile.infosafe.primary.model.DataScopeRole;
import com.fragile.infosafe.primary.repository.DataScopeRoleRepository;
import com.fragile.infosafe.primary.requests.DataScopeRoleRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DataScopeRoleService {

    private final DataScopeRoleRepository dsrRepository;

    public List<DataScopeRole> getAllDataScopeRoles() { return dsrRepository.findAll(); }

    public ResponseEntity<String> makeDataScopeRole(DataScopeRoleRequest request){
        var dataScopeRole = DataScopeRole.builder()
                .role_type(request.getRole_type())
                .role_description(request.getRole_description())
                .build();
        dsrRepository.save(dataScopeRole);

        return ResponseEntity.status(HttpStatus.OK).body("Data Scope Role Added.");
    }

//    public List<DataScopeRole> getDataScopeRolesByDsId(int ds_id) {
//        return dsrRepository.findByDsId(ds_id);
//    }
}
