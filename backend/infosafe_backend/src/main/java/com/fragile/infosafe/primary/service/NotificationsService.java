package com.fragile.infosafe.primary.service;

import com.fragile.infosafe.primary.model.Notifications;
import com.fragile.infosafe.primary.model.User;
import com.fragile.infosafe.primary.repository.NotificationsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationsService {

    private final NotificationsRepository notificationsRepository;

    @Scheduled(cron = "0 0 */10 * * *")
    public void deleteOldRecords() {
        LocalDateTime twelveHoursAgo = LocalDateTime.now().minusHours(12);
        notificationsRepository.deleteByCreatedAtBefore(twelveHoursAgo);
    }

    public void makeNotification(String message, User user){
        Notifications notification = Notifications.builder()
                .createdAt(LocalDateTime.now())
                .notification(message)
                .user(user)
                .build();
        notificationsRepository.save(notification);
    }

    public List<Notifications> getNotifications(User user) {
        return notificationsRepository.findByUserUserId(user.getUser_id());
    }
}
