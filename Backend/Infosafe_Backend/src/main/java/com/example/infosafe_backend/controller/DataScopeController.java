package com.example.infosafe_backend.controller;

import com.example.infosafe_backend.model.DataScope;
import com.example.infosafe_backend.service.DataScopeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/datascope")
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
