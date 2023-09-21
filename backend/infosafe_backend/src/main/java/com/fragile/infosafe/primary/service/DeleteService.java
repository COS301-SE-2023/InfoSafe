package com.fragile.infosafe.primary.service;


import com.fragile.infosafe.delete.deletemodel.DeletedAsset;
import com.fragile.infosafe.delete.deletemodel.DeletedDataScope;
import com.fragile.infosafe.delete.deletemodel.DeletedTask;
import com.fragile.infosafe.delete.deleterepository.DeletedAssetRepository;
import com.fragile.infosafe.delete.deleterepository.DeletedDataScopeRepository;
import com.fragile.infosafe.delete.deleterepository.DeletedTaskRepository;
import com.fragile.infosafe.delete.deleterepository.DeletedUserRepository;
import com.fragile.infosafe.delete.deletemodel.DeletedUser;
import com.fragile.infosafe.primary.model.Asset;
import com.fragile.infosafe.primary.model.DataScope;
import com.fragile.infosafe.primary.model.Task;
import com.fragile.infosafe.primary.model.User;
import com.fragile.infosafe.primary.repository.AssetRepository;
import com.fragile.infosafe.primary.repository.DataScopeRepository;
import com.fragile.infosafe.primary.repository.TaskRepository;
import com.fragile.infosafe.primary.repository.UserRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DeleteService {

    private final UserRepository userRepository;
    private final DataScopeRepository dataScopeRepository;
    private final AssetRepository assetRepository;
    private final TaskRepository taskRepository;
    private final DeletedUserRepository deletedUserRepository;
    private final DeletedDataScopeRepository deletedDataScopeRepository;
    private final DeletedAssetRepository deletedAssetRepository;
    private final DeletedTaskRepository deletedTaskRepository;
    public void deleteUserAndSaveToSecondary(String email) {
        Optional<User> entityOptional = userRepository.findByEmail(email);
        if (entityOptional.isPresent()) {
            User entityToDelete = entityOptional.get();
            DeletedUser de = new DeletedUser();
            de.setEmail(entityToDelete.getEmail());
            de.setPassword(entityToDelete.getPassword());
            de.setFirst_name(entityToDelete.getFirst_name());
            de.setLast_name(entityToDelete.getLast_name());
            de.setRole(entityToDelete.getRole().getRole_name());
            deletedUserRepository.save(de);
            userRepository.delete(entityToDelete);
        }
    }

    public void deleteDataScopeAndSaveToSecondary(int datascope_id) {
        Optional<DataScope> entityOptional = dataScopeRepository.findByDataScopeId(datascope_id);
        if(entityOptional.isPresent()) {
            DataScope entityToDelete = entityOptional.get();
            DeletedDataScope de = new DeletedDataScope();
            de.setDs_name(entityToDelete.getDs_name());
            de.setDs_description(entityToDelete.getDs_description());
            de.setDs_status(entityToDelete.getDs_status());
            de.setDate_captured(entityToDelete.getDate_captured());
            //de.setData_custodian(entityToDelete.());
            deletedDataScopeRepository.save(de);
            dataScopeRepository.delete(entityToDelete);
        }
    }

    public void deleteAssetAndSaveToSecondary(int asset_id) {
        Optional<Asset> entityOptional = assetRepository.findByAssetId(asset_id);
        if(entityOptional.isPresent()) {
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

    public void deleteTaskAndSaveToSecondary(int task_id) {
        Optional<Task> entityOptional = taskRepository.findByTaskId(task_id);
        if(entityOptional.isPresent()){
            Task entityToDelete = entityOptional.get();
            DeletedTask de = new DeletedTask();
            de.setTask_status(entityToDelete.getTask_status());
            de.setTask_description(entityToDelete.getTask_description());
            de.setDue_date(entityToDelete.getDue_date());
            de.setDate_created(entityToDelete.getDate_created());
            deletedTaskRepository.save(de);
            taskRepository.delete(entityToDelete);
        }
    }
}

