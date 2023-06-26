package com.fragile.infosafe.controller;

import com.fragile.infosafe.model.DataScope;
import com.fragile.infosafe.service.DataScopeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/auth/datascope")
@RequiredArgsConstructor
@CrossOrigin
public class DataScopeController {
    @Autowired
    private DataScopeService datascopeService;

    @PostMapping("/add")
    public String add(@RequestBody DataScope datascope){
        datascopeService.saveDataScope(datascope);
        return "New data-scope is added";
    }

    @GetMapping("/getAll")
    public List<DataScope> datascopelist() { return datascopeService.getAllDatascopes(); }
}
