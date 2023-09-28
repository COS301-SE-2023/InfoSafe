package com.fragile.infosafe.primary.controller;

import com.fragile.infosafe.primary.model.Asset;
import com.fragile.infosafe.primary.model.SupportRequest;
import com.fragile.infosafe.primary.model.User;
import com.fragile.infosafe.primary.requests.SupportRequestRequest;
import com.fragile.infosafe.primary.service.SupportRequestService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof User authenticatedUser) {
            return ResponseEntity.ok(service.makeSR(supportrequest, authenticatedUser));
        }
        return ResponseEntity.badRequest().build();
    }

    @GetMapping("/getSr")
    public List<SupportRequest> supportrequestlist() { return service.getAllSupportRequests(); }

    @PutMapping("/update/{id}")
    public SupportRequest updateSupportRequest (@PathVariable("id") int support_id, @RequestBody SupportRequestRequest supportRequest) {
        supportRequest.setSupport_id(support_id);
        return service.updateSupportRequest(supportRequest);
    }
    @GetMapping("/getSrById")
    public ResponseEntity<List<SupportRequest>> supportRequestsById(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof User authenticatedUser) {
            List<SupportRequest> srs = service.getUserSupportRequests(authenticatedUser.getUser_id());
            return ResponseEntity.ok(srs);
        }else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/getTotal")
    public ResponseEntity<Long> getTotalSupportRequests() {
        return ResponseEntity.ok(service.getTotalSupportRequests());
    }

    @GetMapping("/getMyTotal")
    public ResponseEntity<Long> getMyTotalSupportRequests() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof User authenticatedUser) {
            return ResponseEntity.ok(service.getMyTotalSupportRequests(authenticatedUser));
        }
        return ResponseEntity.ok(0L);
    }
}