package com.fragile.infosafe.controller;

import com.fragile.infosafe.model.DataScope;
import com.fragile.infosafe.requests.DataScopeRequest;
import com.fragile.infosafe.service.DataScopeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@Slf4j
@RestController
@RequestMapping("api/datascope")
@RequiredArgsConstructor
//@CrossOrigin
public class DataScopeController {
    private final DataScopeService service;
    @PostMapping("/addDs")
    public ResponseEntity addDs(@RequestBody DataScopeRequest datascope) {
        log.info("Adding a datascope");
        return ResponseEntity.ok(service.makeDs(datascope));
    }

    @GetMapping("/getDs")
    public List<DataScope> datascopelist() { return service.getAllDatascopes(); }
}
