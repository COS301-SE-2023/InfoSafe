package com.fragile.infosafe.primary.controller;

import com.fragile.infosafe.primary.model.Risk;
import com.fragile.infosafe.primary.requests.RiskRequest;
import com.fragile.infosafe.primary.service.RiskService;
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

    @PutMapping("/update/{id}")
    public Risk updateRisk (@PathVariable("id") Long risk_id, @RequestBody Risk risk) {
        risk.setRisk_id(risk_id);
        return service.updateRisk(risk);
    }
}