package com.fragile.infosafe.controller;

import com.fragile.infosafe.auth.AuthenticationRequest;
import com.fragile.infosafe.auth.AuthenticationResponse;
import com.fragile.infosafe.auth.AuthenticationService;
import com.fragile.infosafe.model.Asset;
import com.fragile.infosafe.requests.AssetRequest;
import com.fragile.infosafe.requests.RegisterRequest;
import com.fragile.infosafe.model.DataScope;
import com.fragile.infosafe.model.User;
import com.fragile.infosafe.requests.DataScopeRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;


@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin
public class AuthenticationController {

    private final AuthenticationService service;
    @PostMapping("/add")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ) {
        return ResponseEntity.ok(service.register(request));
    }
    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(service.authenticate(request));
    }

    @PostMapping("/refresh-token")
    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws IOException {
        service.refreshToken(request, response);
    }
    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody AuthenticationRequest request) {
        AuthenticationResponse response = service.authenticate(request);
        if(response.getError()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
        return ResponseEntity.ok(response);
    }
    @GetMapping("/getAll")
    public List<User> userlist() { return service.getAllUsers(); }

    @PostMapping("/addDs")
    public ResponseEntity addDs(@RequestBody DataScopeRequest datascope) {
        return ResponseEntity.ok(service.makeDs(datascope));
    }

    @GetMapping("/getDs")
    public List<DataScope> datascopelist() { return service.getAllDatascopes(); }

    @PostMapping("/addAsset")
    public ResponseEntity addAsset(@RequestBody AssetRequest asset){
        return ResponseEntity.ok(service.makeAsset(asset));
    }

    @GetMapping("/getAsset")
    public List<Asset> list() { return service.getAllAssets(); }

}