package com.fragile.infosafe.primary.service;

import com.fragile.infosafe.primary.model.Notifications;
import com.fragile.infosafe.primary.model.User;
import com.fragile.infosafe.primary.repository.NotificationsRepository;
import com.fragile.infosafe.primary.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class NotificationsService {

    private final NotificationsRepository notificationsRepository;
    private final UserRepository userRepository;

    @Scheduled(cron = "0 0 */10 * * *")
    public void deleteOldRecords() {
        LocalDateTime twelveHoursAgo = LocalDateTime.now().minusHours(12);
        notificationsRepository.deleteByCreatedAtBefore(twelveHoursAgo);
    }

    public void makeNotification(String message, User user){
        try {
            String timeMade = LocalDateTime.now().format(DateTimeFormatter.ofPattern("HH:mm:ss"));
            Notifications notification = Notifications.builder()
                    .createdAt(LocalDateTime.now())
                    .notification(message)
                    .user(user)
                    .timeMade(timeMade)
                    .build();
            notificationsRepository.save(notification);
        }catch(Exception e){
            throw (e);
        }
    }

    public List<Notifications> getNotifications(User user) {
        log.info(String.valueOf(user));
        return notificationsRepository.findByUserUserId(user.getUser_id());
    }
}
