package com.fragile.infosafe.primary.controller;

import com.fragile.infosafe.primary.model.Notifications;
import com.fragile.infosafe.primary.model.User;
import com.fragile.infosafe.primary.service.NotificationsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/notifications")
@RequiredArgsConstructor
@Slf4j
public class NotificationsController {

    private final NotificationsService notificationsService;

    @GetMapping("/getNotifications")
    public ResponseEntity getNotifications(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof User authenticatedUser) {
            if(notificationsService.getNotifications(authenticatedUser) == null){
                return ResponseEntity.ok("No Notifications");
            }
            return ResponseEntity.ok(notificationsService.getNotifications(authenticatedUser));
        }else {
            return ResponseEntity.notFound().build();
        }
    }
}
