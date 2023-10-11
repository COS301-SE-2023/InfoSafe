package com.fragile.infosafe.tests.controller;
// Generated by CodiumAI

import com.fragile.infosafe.primary.controller.AssetRequestController;
import com.fragile.infosafe.primary.model.AssetRequests;
import com.fragile.infosafe.primary.model.User;
import com.fragile.infosafe.primary.requests.AssetRequestRequest;
import com.fragile.infosafe.primary.requests.ReviewRequest;
import com.fragile.infosafe.primary.service.AssetRequestService;
import org.junit.Test;
import org.mockito.Mockito;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContextImpl;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;

public class AssetRequestControllerTest {



    // Getting all asset requests returns a list of AssetRequests
    @Test
    public void test_get_all_asset_requests_returns_list_of_asset_requests() {
        // Mock AssetRequestService
        AssetRequestService service = Mockito.mock(AssetRequestService.class);
        AssetRequestController controller = new AssetRequestController(service);

        // Mock List of AssetRequests
        List<AssetRequests> expectedAssetRequests = new ArrayList<AssetRequests>();
        Mockito.when(service.getAllAssetRequests()).thenReturn(expectedAssetRequests);

        // Call the assetrequestlist method and assert the response
        List<AssetRequests> actualAssetRequests = controller.assetrequestlist();
        assertEquals(expectedAssetRequests, actualAssetRequests);
    }


    // Adding an asset request with invalid asset_id returns HTTP BAD REQUEST
    @Test
    public void test_add_asset_request_with_invalid_asset_id_returns_http_bad_request() {
        // Mock AssetRequestService
        AssetRequestService service = Mockito.mock(AssetRequestService.class);
        AssetRequestController controller = new AssetRequestController(service);

        // Mock AssetRequestRequest
        AssetRequestRequest assetRequest = new AssetRequestRequest();
        assetRequest.setAsset_id(-1);

        // Call the addAr method and assert the response
        ResponseEntity actualResponse = controller.addAr(assetRequest);
        assertEquals(ResponseEntity.badRequest().build(), actualResponse);
    }
}