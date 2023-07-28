package com.fragile.infosafe.controller;

import com.fragile.infosafe.model.AccessRequest;
import com.fragile.infosafe.model.SupportRequest;
import com.fragile.infosafe.requests.AccessRequestRequest;
import com.fragile.infosafe.service.AccessRequestService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@Slf4j
@RestController
@RequestMapping("api/accessrequest")
@RequiredArgsConstructor
//@CrossOrigin
public class AccessRequestController {
    private final AccessRequestService service;
    @PostMapping("/addAr")
    public ResponseEntity addAr(@RequestBody AccessRequestRequest accessrequest) {
        log.info("Adding an access request");
        return ResponseEntity.ok(service.makeAR(accessrequest));
    }

    @GetMapping("/getAr")
    public List<AccessRequest> accessrequestlist() { return service.getAllAccessRequests(); }

    @PutMapping("/update/{id}")
    public AccessRequest updateAccessRequest (@PathVariable("id") int request_id, @RequestBody AccessRequest accessRequest) {
        accessRequest.setRequest_id(request_id);
        return service.updateAccessRequest(accessRequest);
    }
}
