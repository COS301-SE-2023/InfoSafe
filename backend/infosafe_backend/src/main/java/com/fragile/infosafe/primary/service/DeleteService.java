package com.fragile.infosafe.primary.service;


import com.fragile.infosafe.delete.deletemodel.*;
import com.fragile.infosafe.delete.deleterepository.*;
import com.fragile.infosafe.primary.model.*;
import com.fragile.infosafe.primary.repository.*;
import com.fragile.infosafe.primary.requests.AssetRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class DeleteService {

    private final UserRepository userRepository;
    private final DataScopeRepository dataScopeRepository;
    private final AssetRepository assetRepository;
    private final TaskRepository taskRepository;
    private final AccessRequestRepository accessRequestRepository;
    private final AssetRequestRepository assetRequestRepository;
    private final SupportRequestRepository supportRequestRepository;
    private final RiskRepository riskRepository;
    private final DataScopeRoleRepository dataScopeRoleRepository;
    private final EncryptionService encryptionService;

    private final DeletedUserRepository deletedUserRepository;
    private final DeletedDataScopeRepository deletedDataScopeRepository;
    private final DeletedAssetRepository deletedAssetRepository;
    private final DeletedTaskRepository deletedTaskRepository;
    private final DeletedAssetRequestRepository deletedAssetRequestRepository;
    private final DeletedAccessRequestRepository deletedAccessRequestRepository;
    private final DeletedSupportRequestRepository deletedSupportRequestRepository;
    private final DeletedRiskRepository deletedRiskRepository;

    public void deleteUserAndSaveToSecondary(String email) {
        Optional<User> entityOptional = userRepository.findByEmail(encryptionService.encryptString(email));
        if (entityOptional.isPresent()) {
            log.info("Deleting user");
            User entityToDelete = entityOptional.get();
            DeletedUser de = new DeletedUser();
            de.setEmail(entityToDelete.getEmail());
            de.setPassword(entityToDelete.getPassword());
            de.setFirst_name(entityToDelete.getFirst_name());
            de.setLast_name(entityToDelete.getLast_name());
            de.setRole(entityToDelete.getRole().getRole_name());
            for(AccessRequest access : entityToDelete.getAccessRequests()){
                deleteAssetRequestAndSaveToSecondary(access.getRequest_id());
            }
            for(AssetRequests assetRequest : entityToDelete.getAssetRequests()){
                deleteAssetRequestAndSaveToSecondary(assetRequest.getAsset_request_id());
            }
            for(SupportRequest support : entityToDelete.getSupportRequests()){
                deleteAssetRequestAndSaveToSecondary(support.getSupport_id());
            }
            for(Asset asset : entityToDelete.getAssets()){
                deleteAssetRequestAndSaveToSecondary(asset.getAsset_id());
            }

            deletedUserRepository.save(de);
            userRepository.delete(entityToDelete);
        }
    }

    public void deleteDataScopeAndSaveToSecondary(int datascope_id) {
        Optional<DataScope> entityOptional = dataScopeRepository.findByDataScopeId(datascope_id);
        if(entityOptional.isPresent()) {
            log.info("Deleting datascope");
            DataScope entityToDelete = entityOptional.get();
            DeletedDataScope de = new DeletedDataScope();
            de.setDs_name(entityToDelete.getDs_name());
            de.setDs_description(entityToDelete.getDs_description());
            de.setDs_status(entityToDelete.getDs_status());
            de.setDate_captured(entityToDelete.getDate_captured());
            dataScopeRoleRepository.deleteAll(dataScopeRoleRepository.findAllByDataScopeDataScopeId(datascope_id));
            deletedDataScopeRepository.save(de);
            dataScopeRepository.delete(entityToDelete);
        }
    }

    public void deleteAssetAndSaveToSecondary(int asset_id) {
        Optional<Asset> entityOptional = assetRepository.findByAssetId(asset_id);
        if(entityOptional.isPresent()) {
            log.info("Deleting Asset");
            Asset entityToDelete = entityOptional.get();
            DeletedAsset de = new DeletedAsset();
            de.setAsset_description(entityToDelete.getAsset_description());
            de.setAsset_name(entityToDelete.getAsset_name());
            de.setAvailability(entityToDelete.getAvailability());
            de.setStatus(entityToDelete.getStatus());
            de.setUsed(entityToDelete.getUsed());
            de.setDevice_type(entityToDelete.getDevice_type());
            //de.setCurrent_assignee(entityToDelete.getCurrent_assignee());
            //de.setPrevious_assignee(entityToDelete.getPrevious_assignee());
            deletedAssetRepository.save(de);
            assetRepository.delete(entityToDelete);
        }
    }

    public void deleteTaskAndSaveToSecondary(int task_id, String completion) {
        Optional<Task> entityOptional = taskRepository.findByTaskId(task_id);
        if(entityOptional.isPresent()){
            log.info("Deleting task");
            Task entityToDelete = entityOptional.get();
            DeletedTask de = new DeletedTask();
            de.setTask_status(entityToDelete.getTask_status());
            de.setTask_description(entityToDelete.getTask_description());
            de.setDue_date(entityToDelete.getDue_date());
            de.setDate_created(entityToDelete.getDate_created());
            de.setCompletionStatus(completion);
            deletedTaskRepository.save(de);
            taskRepository.delete(entityToDelete);
        }

    }

    public void deleteAccessRequestAndSaveToSecondary(int request_id){
        Optional<AccessRequest> entityOptional = accessRequestRepository.findById(request_id);
        if(entityOptional.isPresent()){
            log.info("Deleting AccessRequest");
            AccessRequest entityToDelete = entityOptional.get();
            DeletedAccessRequest de = new DeletedAccessRequest();
            de.setReason(entityToDelete.getReason());
            de.setUser_id(entityToDelete.getUser().getUser_id());
            de.setStatus(entityToDelete.getStatus());
            de.setData_scope_id(entityToDelete.getData_scope().getData_scope_id());
            deletedAccessRequestRepository.save(de);
            accessRequestRepository.delete(entityToDelete);
        }
    }

    public void deleteSupportRequestAndSaveToSecondary(int request_id){
        Optional<SupportRequest> entityOptional = supportRequestRepository.findById(request_id);
        if(entityOptional.isPresent()){
            SupportRequest entityToDelete = entityOptional.get();
            DeletedSupportRequest de = new DeletedSupportRequest();
            de.setSupport_type(entityToDelete.getSupport_type());
            de.setSupport_description(entityToDelete.getSupport_description());
            de.setSupport_status(entityToDelete.getSupport_status());
            de.setUser_id(entityToDelete.getSupport_id());
            switch (entityToDelete.getSupport_type()) {
                case "DataScope Support":
                        de.setData_scope_id(entityToDelete.getDataScope().getData_scope_id());
                    break;
                case "Asset Support":
                        de.setAsset_id(entityToDelete.getAsset().getAsset_id());
                    break;
                case "Task Support":
                        de.setTask_id(entityToDelete.getTask().getTask_id());
                    break;
            }
            deletedSupportRequestRepository.save(de);
            supportRequestRepository.delete(entityToDelete);
        }
    }

    public void deleteAssetRequestAndSaveToSecondary(int request_id){
        Optional<AssetRequests> entityOptional = assetRequestRepository.findById(request_id);
        log.info(String.valueOf(entityOptional.isPresent()));
        log.info(String.valueOf(entityOptional.get()));
        if(entityOptional.isPresent()){
            log.info("Deleting AssetRequest");
            AssetRequests entityToDelete = entityOptional.get();
            DeletedAssetRequest de = new DeletedAssetRequest();
            de.setAsset_id(entityToDelete.getAsset().getAsset_id());
            de.setReason(entityToDelete.getReason());
            de.setUser_id(entityToDelete.getUser().getUser_id());
            de.setRequest_status(entityToDelete.getRequest_status());
            de.setDesired_date(entityToDelete.getDesired_date());
            deletedAssetRequestRepository.save(de);
            assetRequestRepository.delete(entityToDelete);
        }
    }

    public boolean deleteRiskAndSaveToSecondary(int risk_id) {
        Optional<Risk> entityOptional = riskRepository.findRiskByRiskId(risk_id);
        if(entityOptional.isPresent()){
            log.info("Deleting Risk");
            Risk entityToDelete = entityOptional.get();
            var de = DeletedRisk.builder()
                    .risk_name(entityToDelete.getRisk_name())
                    .risk_description(entityToDelete.getRisk_description())
                    .impact_rating(entityToDelete.getImpact_rating())
                    .suggested_mitigation(entityToDelete.getSuggested_mitigation())
                    .risk_status(entityToDelete.getRisk_status())
                    .probability_rating(entityToDelete.getProbability_rating())
                    .dataScope_id(entityToDelete.getDataScope().getData_scope_id())
                    .build();
            deletedRiskRepository.save(de);
            riskRepository.delete(entityToDelete);
            return true;
        }
        return false;
    }
}

