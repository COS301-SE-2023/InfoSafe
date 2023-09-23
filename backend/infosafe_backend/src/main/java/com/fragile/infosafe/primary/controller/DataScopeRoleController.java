package com.fragile.infosafe.primary.controller;

import com.fragile.infosafe.primary.model.DataScopeRole;
import com.fragile.infosafe.primary.requests.DataScopeRoleRequest;
import com.fragile.infosafe.primary.service.DataScopeRoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("api/dataScopeRole")
@RequiredArgsConstructor
public class DataScopeRoleController {

    private final DataScopeRoleService dsrService;

    @PostMapping("/addDataScopeRole")
    public ResponseEntity addDataScopeRole(@RequestBody DataScopeRoleRequest dsrRequest){
        return ResponseEntity.ok(dsrService.makeDataScopeRole(dsrRequest));
    }

    @GetMapping("/getDataScopeRole")
    public List<DataScopeRole> list() { return dsrService.getAllDataScopeRoles(); }

//    @GetMapping("/getByDsId/{ds_id}")
//    public ResponseEntity<List<DataScopeRole>> getDataScopeRolesByDsId(@PathVariable int ds_id) {
//        List<DataScopeRole> dataScopeRoles = dsrService.getDataScopeRolesByDsId(ds_id);
//        return ResponseEntity.ok(dataScopeRoles);
//    }
}
