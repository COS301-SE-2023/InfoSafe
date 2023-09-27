package com.fragile.infosafe.primary.requests;

import com.fragile.infosafe.primary.model.DataScope;
import com.fragile.infosafe.primary.model.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TaskRequest {
    private int task_id;
    private String task_name;
    private String task_description;
    private String task_status;
    private Date due_date;
    private Date date_created;
    private int data_scope_id;
    private Set<String> users_email = new HashSet<>();
    private String[] users;
}
