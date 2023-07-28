package com.fragile.infosafe.controller;

import com.fragile.infosafe.model.AssignedSupportRequest;
import com.fragile.infosafe.requests.AssignedSupportRequestRequest;
import com.fragile.infosafe.service.AssignedSupportRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/assignedSupportRequest")
@RequiredArgsConstructor
public class AssignedSupportRequestController {

    private final AssignedSupportRequestService asrService;

    @PostMapping("/addAssignedSupportRequest")
    public ResponseEntity addAssignedSupportRequest(@RequestBody AssignedSupportRequestRequest asrRequest){
        return ResponseEntity.ok(asrService.createAssignedSupportRequest(asrRequest));
    }

    @GetMapping("/getAssignedSupportRequest")
    public List<AssignedSupportRequest> list() { return asrService.getAllAssignedSupportRequests(); }
}
