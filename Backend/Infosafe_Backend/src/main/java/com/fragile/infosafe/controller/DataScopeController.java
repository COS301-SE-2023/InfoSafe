package com.fragile.infosafe.controller;

import com.fragile.infosafe.model.DataScope;
import com.fragile.infosafe.service.DataScopeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/datascope")
@CrossOrigin
public class DataScopeController {
    @Autowired
    private DataScopeService datascopeService;

    @PostMapping("/add")
    public String add(@RequestBody DataScope datascope){
        datascopeService.saveDataScope(datascope);
        return "New datascope is added";
    }

    @GetMapping("/getAll")
    public List<DataScope> list() { return datascopeService.getAllDatascopes(); }
}
