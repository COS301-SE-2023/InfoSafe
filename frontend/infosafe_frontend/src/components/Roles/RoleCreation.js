import React, { useState } from 'react';
import '../../styling/RoleCreation.css';

const RoleCreation = () => {
    const subsystems = ['Users', 'Data Scopes', 'Access Requests', 'Compliance Matrix', 'Devices', 'Support Requests', 'Asset Requests', 'Risks', 'Requests'];
    const [checkboxState, setCheckboxState] = useState(subsystems.map(() => false));
    const [canCreate, setCanCreate] = useState(new Array(subsystems.length).fill(false));
    const [canEdit, setCanEdit] = useState(new Array(subsystems.length).fill(false));
    const [canDelete, setCanDelete] = useState(new Array(subsystems.length).fill(false));
    const [canApprove, setCanApprove] = useState(new Array(subsystems.length).fill(false));
    const [canReview, setCanReview] = useState(new Array(subsystems.length).fill(false));
    const [displayPermission, setDisplayPermission] = useState(new Array(subsystems.length).fill(false));
    const [canViewAll, setCanViewAll] = useState(new Array(subsystems.length).fill(false));
    const [allPermissions, setAllPermissions] = useState([]);

    const [permissions, setPermissions] = useState(
        subsystems.map(() => ({
            checkboxState: false,
            canCreate: false,
            canEdit: false,
            canDelete: false,
            canApprove: false,
            canReview: false,
            canViewAll: false,
            displayPermission: false,
        }))
    );
    const handleCheckboxChecked = (index) => {
        const newCheckboxState = [...checkboxState];
        newCheckboxState[index] = !newCheckboxState[index];
        setCheckboxState(newCheckboxState);

        const updatedPermissions = [...permissions];
        updatedPermissions[index].checkboxState = !updatedPermissions[index].checkboxState;
        updatedPermissions[index].displayPermission = !updatedPermissions[index].displayPermission;
        setPermissions(updatedPermissions);

        const newDisplayPermission = [...displayPermission];
        newDisplayPermission[index] = !newDisplayPermission[index];
        setDisplayPermission(newDisplayPermission);
    };

    const handlePermissionChange = (index, permissionType) => {
        const updatedPermissions = [...permissions];
        const permissionState = permissionType === 'canCreate'
            ? 'canCreate'
            : permissionType === 'canEdit'
                ? 'canEdit'
                : permissionType === 'canDelete'
                    ? 'canDelete'
                    : permissionType === 'canApprove'
                        ? 'canApprove'
                        : permissionType === 'canReview'
                            ? 'canReview'
                            : 'canViewAll';
        updatedPermissions[index][permissionState] = !updatedPermissions[index][permissionState];
        setPermissions(updatedPermissions);
    };

    const handleCreate = (index) => {
        const createAllowed = [...canCreate];
        createAllowed[index] = !createAllowed[index];
        setCanCreate(createAllowed);

        const permission = "Create " + subsystems[index];
        if (!createAllowed[index]) {
            setAllPermissions(prev => prev.filter(p => p !== permission));
        } else {
            setAllPermissions(prev => [...prev, permission]);
        }
    }

    const handleEdit = (index) => {
        const editAllowed = [...canEdit];
        editAllowed[index] = !editAllowed[index];
        setCanEdit(editAllowed);

        const permission = "Edit " + subsystems[index];
        if (!editAllowed[index]) {
            setAllPermissions(prev => prev.filter(p => p !== permission));
        } else {
            setAllPermissions(prev => [...prev, permission]);
        }
    }

    const handleDelete = (index) => {
        const deleteAllowed = [...canDelete];
        deleteAllowed[index] = !deleteAllowed[index];
        setCanDelete(deleteAllowed);

        const permission = "Delete " + subsystems[index];
        if (!deleteAllowed[index]) {
            setAllPermissions(prev => prev.filter(p => p !== permission));
        } else {
            setAllPermissions(prev => [...prev, permission]);
        }
    }

    const handleApprove = (index) => {
        const approveAllowed = [...canApprove];
        approveAllowed[index] = !approveAllowed[index];
        setCanApprove(approveAllowed);

        const permission = "Approve " + subsystems[index];
        if (!approveAllowed[index]) {
            setAllPermissions(prev => prev.filter(p => p !== permission));
        } else {
            setAllPermissions(prev => [...prev, permission]);
        }
    }

    const handleReview = (index) => {
        const reviewAllowed = [...canReview];
        reviewAllowed[index] = !reviewAllowed[index];
        setCanReview(reviewAllowed);

        const permission = "Review " + subsystems[index];
        if (!reviewAllowed[index]) {
            setAllPermissions(prev => prev.filter(p => p !== permission));
        } else {
            setAllPermissions(prev => [...prev, permission]);
        }
    }

    const handleViewAll = (index) => {
        const viewAllAllowed = [...canViewAll];
        viewAllAllowed[index] = !viewAllAllowed[index];
        setCanViewAll(viewAllAllowed);

        const permission = "View All " + subsystems[index];
        if (!viewAllAllowed[index]) {
            setAllPermissions(prev => prev.filter(p => p !== permission));
        } else {
            setAllPermissions(prev => [...prev, permission]);
        }
    }

    return (
        <div className="display">
            <div className="roleInfo">
                <p className="roleCreateNameLabel">Role Name:</p>
                <input
                    className="roleCreationRoleNameInput"
                    defaultValue=""
                    // onChange={e => setValues({...values, current_assignee: e.target.value})}
                />
            </div>
            <div className="permissions">
                <div className="permissionsList">
                    {subsystems.map((subsystem, index) =>
                        (
                            <div key={index} className={`${subsystem.replace(/\s+/g, '')}Permissions`.replace(/^\w/, name => name.toLowerCase())}>
                                <div className="displaySubsystemDiv">
                                    <label className="accessLabels">
                                        <input
                                            type="checkbox"
                                            checked={checkboxState[index]}
                                            onChange={() => handleCheckboxChecked(index)}
                                            className={`${subsystem.replace(/\s+/g, '')}Access`.replace(/^\w/, name => name.toLowerCase())}
                                        />
                                        {subsystem}
                                    </label>
                                </div>
                                <div className="permissionsDiv" style={{ display: displayPermission[index] ? 'flex' : 'none' }}>
                                    {(() => {
                                        if (subsystem === 'Users') {
                                            return (
                                                <div className="displayPermissionsDiv" >
                                                    <div className="displayCreateDiv">
                                                        <label className="accessLabels">
                                                            <input
                                                                type="checkbox"
                                                                checked={canCreate[index]}
                                                                onChange={() => handleCreate(index)}
                                                                className={`${subsystem.replace(/\s+/g, '')}Create`.replace(/^\w/, name => name.toLowerCase())}
                                                            />
                                                            Create {subsystem}
                                                        </label>
                                                    </div>
                                                    <div className="displayEditDiv">
                                                        <label className="accessLabels">
                                                            <input
                                                                type="checkbox"
                                                                checked={canEdit[index]}
                                                                onChange={() => handleEdit(index)}
                                                                className={`${subsystem.replace(/\s+/g, '')}Edit`.replace(/^\w/, name => name.toLowerCase())}
                                                            />
                                                            Edit {subsystem}
                                                        </label>
                                                    </div>
                                                    <div className="displayDeleteDiv">
                                                        <label className="accessLabels">
                                                            <input
                                                                type="checkbox"
                                                                checked={canDelete[index]}
                                                                onChange={() => handleDelete(index)}
                                                                className={`${subsystem.replace(/\s+/g, '')}Delete`.replace(/^\w/, name => name.toLowerCase())}
                                                            />
                                                            Delete {subsystem}
                                                        </label>
                                                    </div>
                                                </div>
                                            );
                                        } else if (subsystem === 'Data Scopes') {
                                            return (
                                                <div className="displayPermissionsDiv" >
                                                    <div className="displayCreateDiv">
                                                        <label className="accessLabels">
                                                            <input
                                                                type="checkbox"
                                                                checked={canCreate[index]}
                                                                onChange={() => handleCreate(index)}
                                                                className={`${subsystem.replace(/\s+/g, '')}Create`.replace(/^\w/, name => name.toLowerCase())}
                                                            />
                                                            Create {subsystem}
                                                        </label>
                                                    </div>
                                                    <div className="displayEditDiv">
                                                        <label className="accessLabels">
                                                            <input
                                                                type="checkbox"
                                                                checked={canEdit[index]}
                                                                onChange={() => handleEdit(index)}
                                                                className={`${subsystem.replace(/\s+/g, '')}Edit`.replace(/^\w/, name => name.toLowerCase())}
                                                            />
                                                            Edit {subsystem}
                                                        </label>
                                                    </div>
                                                    <div className="displayDeleteDiv">
                                                        <label className="accessLabels">
                                                            <input
                                                                type="checkbox"
                                                                checked={canDelete[index]}
                                                                onChange={() => handleDelete(index)}
                                                                className={`${subsystem.replace(/\s+/g, '')}Delete`.replace(/^\w/, name => name.toLowerCase())}
                                                            />
                                                            Delete {subsystem}
                                                        </label>
                                                    </div>
                                                </div>
                                            );
                                        }
                                        else if (subsystem === 'Access Requests') {
                                            return (
                                                <div className="displayPermissionsDiv" >
                                                    <div className="displayEditDiv">
                                                        <label className="accessLabels">
                                                            <input
                                                                type="checkbox"
                                                                checked={canEdit[index]}
                                                                onChange={() => handleEdit(index)}
                                                                className={`${subsystem.replace(/\s+/g, '')}Edit`.replace(/^\w/, name => name.toLowerCase())}
                                                            />
                                                            Edit {subsystem}
                                                        </label>
                                                    </div>
                                                    <div className="displayApproveDiv">
                                                        <label className="accessLabels">
                                                            <input
                                                                type="checkbox"
                                                                checked={canApprove[index]}
                                                                onChange={() => handleApprove(index)}
                                                                className={`${subsystem.replace(/\s+/g, '')}Approve`.replace(/^\w/, name => name.toLowerCase())}
                                                            />
                                                            Approve {subsystem}
                                                        </label>
                                                    </div>
                                                </div>
                                            );
                                        }else if (subsystem === 'Compliance Matrix') {
                                            return (
                                                <div className="displayPermissionsDiv" >
                                                    <div className="displayCreateDiv">
                                                        <label className="accessLabels">
                                                            <input
                                                                type="checkbox"
                                                                checked={canCreate[index]}
                                                                onChange={() => handleCreate(index)}
                                                                className={`${subsystem.replace(/\s+/g, '')}Create`.replace(/^\w/, name => name.toLowerCase())}
                                                            />
                                                            Create Tasks
                                                        </label>
                                                    </div>
                                                    <div className="displayEditDiv">
                                                        <label className="accessLabels">
                                                            <input
                                                                type="checkbox"
                                                                checked={canEdit[index]}
                                                                onChange={() => handleEdit(index)}
                                                                className={`${subsystem.replace(/\s+/g, '')}Edit`.replace(/^\w/, name => name.toLowerCase())}
                                                            />
                                                            Edit Tasks
                                                        </label>
                                                    </div>
                                                    <div className="displayDeleteDiv">
                                                        <label className="accessLabels">
                                                            <input
                                                                type="checkbox"
                                                                checked={canDelete[index]}
                                                                onChange={() => handleDelete(index)}
                                                                className={`${subsystem.replace(/\s+/g, '')}Delete`.replace(/^\w/, name => name.toLowerCase())}
                                                            />
                                                            Delete Tasks
                                                        </label>
                                                    </div>
                                                    <div className="displayApproveDiv">
                                                        <label className="accessLabels">
                                                            <input
                                                                type="checkbox"
                                                                checked={canApprove[index]}
                                                                onChange={() => handleApprove(index)}
                                                                className={`${subsystem.replace(/\s+/g, '')}Approve`.replace(/^\w/, name => name.toLowerCase())}
                                                            />
                                                            Approve Tasks
                                                        </label>
                                                    </div>
                                                </div>
                                            );
                                        }else if (subsystem === 'Devices') {
                                            return (
                                                <div className="displayPermissionsDiv" >
                                                    <div className="displayCreateDiv">
                                                        <label className="accessLabels">
                                                            <input
                                                                type="checkbox"
                                                                checked={canCreate[index]}
                                                                onChange={() => handleCreate(index)}
                                                                className={`${subsystem.replace(/\s+/g, '')}Create`.replace(/^\w/, name => name.toLowerCase())}
                                                            />
                                                            Create {subsystem}
                                                        </label>
                                                    </div>
                                                    <div className="displayEditDiv">
                                                        <label className="accessLabels">
                                                            <input
                                                                type="checkbox"
                                                                checked={canEdit[index]}
                                                                onChange={() => handleEdit(index)}
                                                                className={`${subsystem.replace(/\s+/g, '')}Edit`.replace(/^\w/, name => name.toLowerCase())}
                                                            />
                                                            Edit {subsystem}
                                                        </label>
                                                    </div>
                                                    <div className="displayDeleteDiv">
                                                        <label className="accessLabels">
                                                            <input
                                                                type="checkbox"
                                                                checked={canDelete[index]}
                                                                onChange={() => handleDelete(index)}
                                                                className={`${subsystem.replace(/\s+/g, '')}Delete`.replace(/^\w/, name => name.toLowerCase())}
                                                            />
                                                            Delete {subsystem}
                                                        </label>
                                                    </div>
                                                </div>
                                            );
                                        }
                                        else if (subsystem === 'Support Requests') {
                                            return (
                                                <div className="displayPermissionsDiv" >
                                                    <div className="displayViewAllDiv">
                                                        <label className="accessLabels">
                                                            <input
                                                                type="checkbox"
                                                                checked={canViewAll[index]}
                                                                onChange={() => handleViewAll(index)}
                                                                className={`${subsystem.replace(/\s+/g, '')}Create`.replace(/^\w/, name => name.toLowerCase())}
                                                            />
                                                            View All {subsystem}
                                                        </label>
                                                    </div>
                                                    <div className="displayEditDiv">
                                                        <label className="accessLabels">
                                                            <input
                                                                type="checkbox"
                                                                checked={canEdit[index]}
                                                                onChange={() => handleEdit(index)}
                                                                className={`${subsystem.replace(/\s+/g, '')}Edit`.replace(/^\w/, name => name.toLowerCase())}
                                                            />
                                                            Edit {subsystem}
                                                        </label>
                                                    </div>
                                                    <div className="displayDeleteDiv">
                                                        <label className="accessLabels">
                                                            <input
                                                                type="checkbox"
                                                                checked={canDelete[index]}
                                                                onChange={() => handleDelete(index)}
                                                                className={`${subsystem.replace(/\s+/g, '')}Delete`.replace(/^\w/, name => name.toLowerCase())}
                                                            />
                                                            Delete {subsystem}
                                                        </label>
                                                    </div>
                                                </div>
                                            );
                                        }else if (subsystem === 'Asset Requests') {
                                            return (
                                                <div className="displayPermissionsDiv" >
                                                    <div className="displayReviewDiv">
                                                        <label className="accessLabels">
                                                            <input
                                                                type="checkbox"
                                                                checked={canReview[index]}
                                                                onChange={() => handleReview(index)}
                                                                className={`${subsystem.replace(/\s+/g, '')}Approve`.replace(/^\w/, name => name.toLowerCase())}
                                                            />
                                                            Review {subsystem}
                                                        </label>
                                                    </div>
                                                </div>
                                            );
                                        }else if (subsystem === 'Risks') {
                                            return (
                                                <div className="displayPermissionsDiv" >
                                                    <div className="displayCreateDiv">
                                                        <label className="accessLabels">
                                                            <input
                                                                type="checkbox"
                                                                checked={canCreate[index]}
                                                                onChange={() => handleCreate(index)}
                                                                className={`${subsystem.replace(/\s+/g, '')}Create`.replace(/^\w/, name => name.toLowerCase())}
                                                            />
                                                            Create {subsystem}
                                                        </label>
                                                    </div>
                                                    <div className="displayEditDiv">
                                                        <label className="accessLabels">
                                                            <input
                                                                type="checkbox"
                                                                checked={canEdit[index]}
                                                                onChange={() => handleEdit(index)}
                                                                className={`${subsystem.replace(/\s+/g, '')}Edit`.replace(/^\w/, name => name.toLowerCase())}
                                                            />
                                                            Edit {subsystem}
                                                        </label>
                                                    </div>
                                                    <div className="displayDeleteDiv">
                                                        <label className="accessLabels">
                                                            <input
                                                                type="checkbox"
                                                                checked={canDelete[index]}
                                                                onChange={() => handleDelete(index)}
                                                                className={`${subsystem.replace(/\s+/g, '')}Delete`.replace(/^\w/, name => name.toLowerCase())}
                                                            />
                                                            Delete {subsystem}
                                                        </label>
                                                    </div>
                                                    <div className="displayReviewDiv">
                                                        <label className="accessLabels">
                                                            <input
                                                                type="checkbox"
                                                                checked={canReview[index]}
                                                                onChange={() => handleReview(index)}
                                                                className={`${subsystem.replace(/\s+/g, '')}Approve`.replace(/^\w/, name => name.toLowerCase())}
                                                            />
                                                            Review {subsystem}
                                                        </label>
                                                    </div>
                                                </div>
                                            );
                                        }
                                        else if (subsystem === 'Requests') {
                                            return (
                                                <div className="displayPermissionsDiv" >
                                                    <div className="displayCreateDiv">
                                                        <label className="accessLabels">
                                                            <input
                                                                type="checkbox"
                                                                checked={canCreate[index]}
                                                                onChange={() => handleCreate(index)}
                                                                className={`${subsystem.replace(/\s+/g, '')}Create`.replace(/^\w/, name => name.toLowerCase())}
                                                            />
                                                            Create Asset Requests
                                                        </label>
                                                    </div>
                                                    <div className="displayCreateDiv">
                                                        <label className="accessLabels">
                                                            <input
                                                                type="checkbox"
                                                                checked={canCreate[index]}
                                                                onChange={() => handleCreate(index)}
                                                                className={`${subsystem.replace(/\s+/g, '')}Create`.replace(/^\w/, name => name.toLowerCase())}
                                                            />
                                                            Create Support Requests
                                                        </label>
                                                    </div>
                                                    <div className="displayCreateDiv">
                                                        <label className="accessLabels">
                                                            <input
                                                                type="checkbox"
                                                                checked={canCreate[index]}
                                                                onChange={() => handleCreate(index)}
                                                                className={`${subsystem.replace(/\s+/g, '')}Create`.replace(/^\w/, name => name.toLowerCase())}
                                                            />
                                                            Create Access Requests
                                                        </label>
                                                    </div>
                                                </div>
                                            );
                                        }
                                })()}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <button
                className="roleCreationButton"
                onClick={() => {
                    console.log('Button clicked!');
                    console.log(allPermissions);
                }}>
                Create Role
            </button>
        </div>

    );
};

export default RoleCreation;