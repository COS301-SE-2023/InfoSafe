package com.fragile.infosafe.controller;

import com.fragile.infosafe.model_primary.AccessRequest;
import com.fragile.infosafe.requests.AccessRequestRequest;
import com.fragile.infosafe.service.AccessRequestService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
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
        ResponseEntity<String> response = service.makeAR(accessrequest);

        if (response.getStatusCode() == HttpStatus.OK) {
            log.info("Adding an access request");
            return ResponseEntity.status(HttpStatus.OK).body("AccessRequest created.");
        } else if (response.getStatusCode() == HttpStatus.CONFLICT) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("AccessRequest already exists.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating AccessRequest.");
        }



    }

    @GetMapping("/getAr")
    public List<AccessRequest> accessrequestlist() { return service.getAllAccessRequests(); }

    @PutMapping("/update/{id}")
    public AccessRequest updateAccessRequest (@PathVariable("id") int request_id, @RequestBody AccessRequest accessRequest) {
        accessRequest.setRequest_id(request_id);
        return service.updateAccessRequest(accessRequest);
    }

}
