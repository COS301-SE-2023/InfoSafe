package com.fragile.infosafe.primary.controller;

import com.fragile.infosafe.primary.model.AccessRequest;
import com.fragile.infosafe.primary.model.User;
import com.fragile.infosafe.primary.requests.AccessRequestRequest;
import com.fragile.infosafe.primary.requests.ReviewRequest;
import com.fragile.infosafe.primary.service.AccessRequestService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof User authenticatedUser) {
            return ResponseEntity.ok(service.makeAR(accessrequest, authenticatedUser));
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/getAr")
    public List<AccessRequest> accessrequestlist() { return service.getAllAccessRequests(); }

    @PutMapping("/update/{id}")
    public AccessRequest updateAccessRequest (@PathVariable("id") int request_id, @RequestBody AccessRequest accessRequest) {
        accessRequest.setRequest_id(request_id);
        return service.updateAccessRequest(accessRequest);
    }

    @PostMapping("/reviewAccess")
    public ResponseEntity<String> reviewAccessRequest(@RequestBody ReviewRequest reviewRequest) {
        return service.reviewAccessRequest(reviewRequest);
    }

}
