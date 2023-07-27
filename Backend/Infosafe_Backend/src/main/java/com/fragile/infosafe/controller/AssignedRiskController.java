package com.fragile.infosafe.controller;

import com.fragile.infosafe.model.AssignedRisk;
import com.fragile.infosafe.requests.AssignedRiskRequest;
import com.fragile.infosafe.service.AssignedRiskService;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/assignedRisk")
@RequiredArgsConstructor
public class AssignedRiskController {

    private final AssignedRiskService arService;

    @PostMapping("/addAssignedRisk")
    public ResponseEntity addAssignedRisk(@RequestBody AssignedRiskRequest arRequest){
        return ResponseEntity.ok(arService.createAssignedRisk(arRequest));
    }

    @GetMapping("/getAssignedRisk")
    public List<AssignedRisk> list() { return arService.getAllAssignedRisks(); }
}
