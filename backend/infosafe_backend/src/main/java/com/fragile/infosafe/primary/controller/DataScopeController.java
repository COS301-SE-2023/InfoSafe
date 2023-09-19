package com.fragile.infosafe.primary.controller;

import com.fragile.infosafe.primary.model.DataScope;
import com.fragile.infosafe.primary.service.DataScopeService;
import com.fragile.infosafe.primary.requests.DataScopeRequest;
import com.fragile.infosafe.primary.service.DeleteService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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
        return ResponseEntity.ok(service.makeDs(datascope));
    }

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

    @GetMapping("/myNumberDs/")
    public int getMyNumberDataScopes(){
        return 0;
    }


}
