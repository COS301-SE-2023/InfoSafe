package com.fragile.infosafe.controller;

import com.fragile.infosafe.model.AssignedAsset;
import com.fragile.infosafe.requests.AssignedAssetRequest;
import com.fragile.infosafe.service.AssignedAssetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/assignedAsset")
@RequiredArgsConstructor
public class AssignedAssetController {

    private final AssignedAssetService aaService;

    @PostMapping("/addAssignedAsset")
    public ResponseEntity addAssignedAsset(@RequestBody AssignedAssetRequest aaRequest){
        return ResponseEntity.ok(aaService.createAssignedAsset(aaRequest));
    }

    @GetMapping("/getAssignedAsset")
    public List<AssignedAsset> list() { return aaService.getAllAssignedAssets(); }
}
