package com.fragile.infosafe.tests;
// Generated by CodiumAI

import com.fragile.infosafe.primary.model.*;
import org.junit.Test;
import static org.junit.Assert.*;

public class SupportRequestTest {


    // Create a SupportRequest with all required fields
    @Test
    public void test_create_support_request_with_required_fields() {
        // Create a SupportRequest with all required fields
        SupportRequest supportRequest = SupportRequest.builder()
                .support_type("Type")
                .support_description("Description")
                .support_status("Status")
                .user_id(new User())
                .dataScope_id(new DataScope())
                .task_id(new Task())
                .asset_id(new Asset())
                .build();

        // Assert that the SupportRequest is not null
        assertNotNull(supportRequest);
        // Assert that the support_id is not null
        assertNotNull(supportRequest.getSupport_id());
        // Assert that the support_type is set correctly
        assertEquals("Type", supportRequest.getSupport_type());
        // Assert that the support_description is set correctly
        assertEquals("Description", supportRequest.getSupport_description());
        // Assert that the support_status is set correctly
        assertEquals("Status", supportRequest.getSupport_status());
        // Assert that the user_id is set correctly
        assertNotNull(supportRequest.getUser_id());
        // Assert that the dataScope_id is set correctly
        assertNotNull(supportRequest.getDataScope_id());
        // Assert that the task_id is set correctly
        assertNotNull(supportRequest.getTask_id());
        // Assert that the asset_id is set correctly
        assertNotNull(supportRequest.getAsset_id());
    }

    // Create a SupportRequest with optional fields
    @Test
    public void test_create_support_request_with_optional_fields() {
        // Create a SupportRequest with optional fields
        SupportRequest supportRequest = SupportRequest.builder()
                .support_type("Type")
                .support_description("Description")
                .support_status("Status")
                .user(new User())
                .dataScope(new DataScope())
                .task(new Task())
                .asset(new Asset())
                .build();

        // Assert that the SupportRequest is not null
        assertNotNull(supportRequest);
        // Assert that the support_id is not null
        assertNotNull(supportRequest.getSupport_id());
        // Assert that the support_type is set correctly
        assertEquals("Type", supportRequest.getSupport_type());
        // Assert that the support_description is set correctly
        assertEquals("Description", supportRequest.getSupport_description());
        // Assert that the support_status is set correctly
        assertEquals("Status", supportRequest.getSupport_status());
        // Assert that the user_id is set correctly
        assertNotNull(supportRequest.getUser_id());
        // Assert that the dataScope_id is set correctly
        assertNotNull(supportRequest.getDataScope_id());
        // Assert that the task_id is set correctly
        assertNotNull(supportRequest.getTask_id());
        // Assert that the asset_id is set correctly
        assertNotNull(supportRequest.getAsset_id());
    }

    // Update a SupportRequest with all fields
    @Test
    public void test_update_support_request_with_all_fields() {
        // Create a SupportRequest with all fields
        SupportRequest supportRequest = SupportRequest.builder()
                .support_type("Type")
                .support_description("Description")
                .support_status("Status")
                .user(new User())
                .dataScope(new DataScope())
                .task(new Task())
                .asset(new Asset())
                .build();

        // Update the SupportRequest with new values
        supportRequest.setSupport_type("New Type");
        supportRequest.setSupport_description("New Description");
        supportRequest.setSupport_status("New Status");
        supportRequest.setUser(new User());
        supportRequest.setDataScope(new DataScope());
        supportRequest.setTask(new Task());
        supportRequest.setAsset(new Asset());

        // Assert that the support_type is updated correctly
        assertEquals("New Type", supportRequest.getSupport_type());
        // Assert that the support_description is updated correctly
        assertEquals("New Description", supportRequest.getSupport_description());
        // Assert that the support_status is updated correctly
        assertEquals("New Status", supportRequest.getSupport_status());
        // Assert that the user_id is updated correctly
        assertNotNull(supportRequest.getUser());
        // Assert that the dataScope_id is updated correctly
        assertNotNull(supportRequest.getDataScope());
        // Assert that the task_id is updated correctly
        assertNotNull(supportRequest.getTask());
        // Assert that the asset_id is updated correctly
        assertNotNull(supportRequest.getAsset());
    }

    // Create a SupportRequest with invalid user_id
    @Test
    public void test_create_support_request_with_invalid_user_id() {
        // Create a SupportRequest with invalid user_id
        SupportRequest supportRequest = SupportRequest.builder()
                .support_type("Type")
                .support_description("Description")
                .support_status("Status")
                .user(null)
                .dataScope(new DataScope())
                .task(new Task())
                .asset(new Asset())
                .build();

        // Assert that the SupportRequest is not null
        assertNotNull(supportRequest);
        // Assert that the support_id is not null
        assertNotNull(supportRequest.getSupport_id());
        // Assert that the support_type is set correctly
        assertEquals("Type", supportRequest.getSupport_type());
        // Assert that the support_description is set correctly
        assertEquals("Description", supportRequest.getSupport_description());
        // Assert that the support_status is set correctly
        assertEquals("Status", supportRequest.getSupport_status());
        // Assert that the user_id is null
        assertNull(supportRequest.getUser());
        // Assert that the dataScope_id is set correctly
        assertNotNull(supportRequest.getDataScope());
        // Assert that the task_id is set correctly
        assertNotNull(supportRequest.getTask());
        // Assert that the asset_id is set correctly
        assertNotNull(supportRequest.getAsset());
    }

    // Create a SupportRequest with invalid dataScope_id
    @Test
    public void test_create_support_request_with_invalid_dataScope_id() {
        // Create a SupportRequest with invalid dataScope_id
        SupportRequest supportRequest = SupportRequest.builder()
                .support_type("Type")
                .support_description("Description")
                .support_status("Status")
                .user(new User())
                .dataScope(null)
                .task(new Task())
                .asset(new Asset())
                .build();

        // Assert that the SupportRequest is not null
        assertNotNull(supportRequest);
        // Assert that the support_id is not null
        assertNotNull(supportRequest.getSupport_id());
        // Assert that the support_type is set correctly
        assertEquals("Type", supportRequest.getSupport_type());
        // Assert that the support_description is set correctly
        assertEquals("Description", supportRequest.getSupport_description());
        // Assert that the support_status is set correctly
        assertEquals("Status", supportRequest.getSupport_status());
        // Assert that the user_id is set correctly
        assertNotNull(supportRequest.getUser());
        // Assert that the dataScope_id is null
        assertNull(supportRequest.getDataScope());
        // Assert that the task_id is set correctly
        assertNotNull(supportRequest.getTask());
        // Assert that the asset_id is set correctly
        assertNotNull(supportRequest.getAsset());
    }

}