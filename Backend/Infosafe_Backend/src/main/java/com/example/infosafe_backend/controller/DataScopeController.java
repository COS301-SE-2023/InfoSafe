package com.example.infosafe_backend.controller;

import com.example.infosafe_backend.model.DataScope;
import com.example.infosafe_backend.service.DataScopeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/datascope")
public class DataScopeController {
    @Autowired
    private DataScopeService datascopeService;

    @PostMapping("/add")
    public String add(@RequestBody DataScope datascope){
        datascopeService.saveDataScope(datascope);
        return "New user is added";
    }

}
