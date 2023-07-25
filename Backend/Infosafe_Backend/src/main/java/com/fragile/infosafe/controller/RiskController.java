package com.fragile.infosafe.controller;

import com.fragile.infosafe.model.Risk;
import com.fragile.infosafe.requests.RiskRequest;
import com.fragile.infosafe.service.RiskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/risk")
@RequiredArgsConstructor
public class RiskController {
    private final RiskService service;

    @PostMapping("/addRisk")
    public ResponseEntity addRisk(@RequestBody RiskRequest risk){
        return ResponseEntity.ok(service.makeRisk(risk));
    }

    @GetMapping("/getRisk")
    public List<Risk> list() { return service.getAllRisks(); }
}
