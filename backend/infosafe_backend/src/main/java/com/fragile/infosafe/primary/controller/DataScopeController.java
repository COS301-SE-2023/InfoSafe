package com.fragile.infosafe.primary.controller;

import com.fragile.infosafe.primary.model.DataScope;
import com.fragile.infosafe.primary.model.User;
import com.fragile.infosafe.primary.service.DataScopeService;
import com.fragile.infosafe.primary.requests.DataScopeRequest;
import com.fragile.infosafe.primary.service.DeleteService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("api/datascope")
@RequiredArgsConstructor
public class DataScopeController {
    private final DataScopeService service;
    private final DeleteService deleteService;
    @PostMapping("/addDs")
    public ResponseEntity addDs(@RequestBody DataScopeRequest datascope) {
        log.info("Adding a datascope");
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof User authenticatedUser) {
            return ResponseEntity.ok(service.makeDs(datascope, authenticatedUser));
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/getTotal")
    public long getTotalDs(){ return service.getTotalDs();}

    @GetMapping("/getDs")
    public List<DataScope> datascopelist() { return service.getAllDatascopes(); }

    @PutMapping("/update/{id}")
    public DataScope updateDataScope (@PathVariable("id") int ds_id, @RequestBody DataScope datascope) {
        datascope.setData_scope_id(ds_id);
        return service.updateDataScope(datascope);
    }

    @GetMapping("/checkName")
    public ResponseEntity<Boolean> checkEmailExists(@RequestParam("dsname") String name) {
        boolean nameExists = service.checkDataScopeExists(name);
        return ResponseEntity.ok(nameExists);
    }

    @DeleteMapping("/deleteDataScope/{dataScopeId}")
    public void deleteDataScopeAndSaveToSecondary(@PathVariable int dataScopeId) {
        deleteService.deleteDataScopeAndSaveToSecondary(dataScopeId);
    }

    @GetMapping("/numberDs")
    public int getNumberDataScopes(){
        return 0;
    }

    @GetMapping("/myNumberDs")
    public int getMyNumberDataScopes(){
        return 0;
    }

    @GetMapping("/availableDatascopes")
    public ResponseEntity<List<DataScope>> getAllAvailableDatascopes(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof User authenticatedUser) {
            return ResponseEntity.ok(service.getDataScopesNotAssociatedWithUser(authenticatedUser));
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/getMyDatascopes")
    public ResponseEntity<List<DataScope>> getAllMyDatascopes(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof User authenticatedUser) {
            return ResponseEntity.ok(service.getDataScopesByUser(authenticatedUser));
        }
        return ResponseEntity.badRequest().build();
    }

}
