package com.fragile.infosafe.controller;

import com.fragile.infosafe.model.SupportRequest;
import com.fragile.infosafe.requests.SupportRequestRequest;
import com.fragile.infosafe.service.SupportRequestService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@Slf4j
@RestController
@RequestMapping("api/supportrequest")
@RequiredArgsConstructor
//@CrossOrigin
public class SupportRequestController {
    private final SupportRequestService service;
    @PostMapping("/addSr")
    public ResponseEntity addSr(@RequestBody SupportRequestRequest supportrequest) {
        log.info("Adding a support request");
        return ResponseEntity.ok(service.makeSR(supportrequest));
    }

    @GetMapping("/getSr")
    public List<SupportRequest> supportrequestlist() { return service.getAllSupportRequests(); }

    @PutMapping("/update/{id}")
    public SupportRequest updateSupportRequest (@PathVariable("id") int support_id, @RequestBody SupportRequest supportRequest) {
        supportRequest.setSupport_id(support_id);
        return service.updateSupportRequest(supportRequest);
    }
}
