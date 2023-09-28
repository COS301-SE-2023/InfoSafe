import React, {useEffect, useState} from 'react';
import '../../styling/RoleCreation.css';
import {IoHelpCircle} from "react-icons/io5";
import {HelpPopup} from "../HelpPopup";
import role_help from '../../images/role_help.png';

const RoleCreation = () => {
    const subsystems = ['Users', 'Data Scopes', 'Access Requests', 'Tasks', 'Devices', 'Support Requests', 'Asset Requests', 'Risks', 'Requests'];
    const [checkboxState, setCheckboxState] = useState(subsystems.map(() => false));
    const [canCreate, setCanCreate] = useState(new Array(subsystems.length).fill(false));
    const [canEdit, setCanEdit] = useState(new Array(subsystems.length).fill(false));
    const [canDelete, setCanDelete] = useState(new Array(subsystems.length).fill(false));
    const [canApprove, setCanApprove] = useState(new Array(subsystems.length).fill(false));
    const [canReview, setCanReview] = useState(new Array(subsystems.length).fill(false));
    const [displayPermission, setDisplayPermission] = useState(new Array(subsystems.length).fill(false));
    const [canViewAll, setCanViewAll] = useState(new Array(subsystems.length).fill(false));
    const [canCreateAssetRequest, setCanCreateAssetRequest] = useState([]);
    const [canCreateSupportRequest, setCanCreateSupportRequest] = useState([]);
    const [canCreateAccessRequest, setCanCreateAccessRequest] = useState([]);
    const [role_name, setRoleName] = useState([]);
    let permissionsList = [];
    let permissions = 0;
    const [roleNames, setRoleNames] = useState('');

    const handleClick = (e) => {
        submitInfo();
        e.preventDefault();
        const role = {role_name, permissions};

        // add check to make sure role doesn't exist
        fetch(`http://localhost:8080/api/role/checkName?rolename=${role_name}`,{
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + sessionStorage.getItem('accessToken'),
                    },
                })
                    .then((response) => response.json())
                    .then((data) => {
                        if (data) {
                            console.log("role name already exists");
                        } else {
                            console.log(role);
                            fetch("http://localhost:8080/api/role/addRole", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: "Bearer " + sessionStorage.getItem('accessToken'),
                                },
                                body: JSON.stringify(role),
                            }).then(() => {
                                console.log("New Role added");
                            })
                                .catch((error) => {
                                    console.error("Error adding new Role:", error);
                                });
                        }
                        permissions = 0;
                        // popupClose();
                    });
    };

    useEffect(() => {
        fetch("http://localhost:8080/api/role/getRoleNames", {
            method:"GET",
            headers:{"Content-Type":"application/json",
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            },
        }).then((res) => res.json())
            .then((result) => {
                setRoleNames(result);
            });
    }, [])

    const roleItems = [];
    for (let i = 0 ; i < roleNames.length ; i++){
        roleItems.push(<li key={i}><p>{roleNames[i]}</p></li>)
    }

    const handleCheckboxChecked = (index, subsystem) => {
        const newCheckboxState = [...checkboxState];
        newCheckboxState[index] = !newCheckboxState[index];
        setCheckboxState(newCheckboxState);

        const newDisplayPermission = [...displayPermission];
        newDisplayPermission[index] = !newDisplayPermission[index];
        setDisplayPermission(newDisplayPermission);

        if (newCheckboxState[index] === false && subsystem === "Users")
        {
            let permissionsCheckbox = document.querySelector('input.usersCreate');
            if (permissionsCheckbox.checked) {
               handleCreate(0);

               if (permissionsList.includes("Create Users"))
               {
                   permissionsList.filter(permissionList => permissionList !== "Create Users");
               }
            }

            permissionsCheckbox = document.querySelector('input.usersEdit');
            if (permissionsCheckbox.checked) {
                handleEdit(0);

                if (permissionsList.includes("Edit Users"))
                {
                    permissionsList.filter(permissionList => permissionList !== "Edit Users");
                }
            }

            permissionsCheckbox = document.querySelector('input.usersDelete');
            if (permissionsCheckbox.checked) {
                handleDelete(0);

                if (permissionsList.includes("Delete Users"))
                {
                    permissionsList.filter(permissionList => permissionList !== "Delete Users");
                }
            }
        }

        if (newCheckboxState[index] === false && subsystem === "Data Scopes")
        {
            let permissionsCheckbox = document.querySelector('input.dataScopesCreate');
            if (permissionsCheckbox.checked) {
                handleCreate(1);

                if (permissionsList.includes("Create Data Scopes"))
                {
                    permissionsList.filter(permissionList => permissionList !== "Create Data Scopes");
                }
            }

            permissionsCheckbox = document.querySelector('input.dataScopesEdit');
            if (permissionsCheckbox.checked) {
                handleEdit(1);

                if (permissionsList.includes("Edit Data Scopes"))
                {
                    permissionsList.filter(permissionList => permissionList !== "Edit Data Scopes");
                }
            }

            permissionsCheckbox = document.querySelector('input.dataScopesDelete');
            if (permissionsCheckbox.checked) {
                handleDelete(1);

                if (permissionsList.includes("Delete Data Scopes"))
                {
                    permissionsList.filter(permissionList => permissionList !== "Delete Data Scopes");
                }
            }
        }

        if (newCheckboxState[index] === false && subsystem === "Access Requests")
        {
            let permissionsCheckbox = document.querySelector('input.accessRequestsEdit');
            if (permissionsCheckbox.checked) {
                handleEdit(2);

                if (permissionsList.includes("Edit Access Requests"))
                {
                    permissionsList.filter(permissionList => permissionList !== "Edit Access Requests");
                }
            }

            permissionsCheckbox = document.querySelector('input.accessRequestsApprove');
            if (permissionsCheckbox.checked) {
                handleApprove(2);

                if (permissionsList.includes("Approve Access Requests"))
                {
                    permissionsList.filter(permissionList => permissionList !== "Approve Access Requests");
                }
            }


        }
        if (newCheckboxState[index] === false && subsystem === "Tasks")
        {

            let permissionsCheckbox = document.querySelector('input.tasksCreate');
            if (permissionsCheckbox.checked) {
                handleCreate(3);

                if (permissionsList.includes("Create Tasks"))
                {
                    permissionsList.filter(permissionList => permissionList !== "Create Tasks");
                }
            }

            permissionsCheckbox = document.querySelector('input.tasksEdit');
            if (permissionsCheckbox.checked) {
                handleEdit(3);

                if (permissionsList.includes("Edit Tasks"))
                {
                    permissionsList.filter(permissionList => permissionList !== "Edit Tasks");
                }
            }

            permissionsCheckbox = document.querySelector('input.tasksDelete');
            if (permissionsCheckbox.checked) {
                handleDelete(3);

                if (permissionsList.includes("Delete Tasks"))
                {
                    permissionsList.filter(permissionList => permissionList !== "Delete Tasks");
                }
            }

            permissionsCheckbox = document.querySelector('input.tasksApprove');
            if (permissionsCheckbox.checked) {
                handleApprove(3);

                if (permissionsList.includes("Approve Tasks"))
                {
                    permissionsList.filter(permissionList => permissionList !== "Approve Tasks");
                }
            }
        }
        if (newCheckboxState[index] === false && subsystem === "Devices")
        {
            let permissionsCheckbox = document.querySelector('input.devicesCreate');
            if (permissionsCheckbox.checked) {
                handleCreate(4);

                if (permissionsList.includes("Create Devices"))
                {
                    permissionsList.filter(permissionList => permissionList !== "Create Devices");
                }
            }

            permissionsCheckbox = document.querySelector('input.devicesEdit');
            if (permissionsCheckbox.checked) {
                handleEdit(4);

                if (permissionsList.includes("Edit Devices"))
                {
                    permissionsList.filter(permissionList => permissionList !== "Edit Devices");
                }
            }

            permissionsCheckbox = document.querySelector('input.devicesDelete');
            if (permissionsCheckbox.checked) {
                handleDelete(4);

                if (permissionsList.includes("Delete Devices"))
                {
                    permissionsList.filter(permissionList => permissionList !== "Delete Devices");
                }
            }
        }

        if (newCheckboxState[index] === false && subsystem === "Support Requests")
        {
            let permissionsCheckbox = document.querySelector('input.supportRequestsViewAll');
            if (permissionsCheckbox.checked) {
                handleViewAll(5);

                if (permissionsList.includes("View All Support Requests"))
                {
                    permissionsList.filter(permissionList => permissionList !== "View All Support Requests");
                }
            }

            permissionsCheckbox = document.querySelector('input.supportRequestsEdit');
            if (permissionsCheckbox.checked) {
                handleEdit(5);

                if (permissionsList.includes("Edit Support Requests"))
                {
                    permissionsList.filter(permissionList => permissionList !== "Edit Support Requests");
                }
            }

            permissionsCheckbox = document.querySelector('input.supportRequestsDelete');
            if (permissionsCheckbox.checked) {
                handleDelete(5);

                if (permissionsList.includes("Delete Support Requests"))
                {
                    permissionsList.filter(permissionList => permissionList !== "Delete Support Requests");
                }
            }
        }

        if (newCheckboxState[index] === false && subsystem === "Asset Requests")
        {
            let permissionsCheckbox = document.querySelector('input.assetRequestsReview');
            if (permissionsCheckbox.checked) {
                handleReview(6);

                if (permissionsList.includes("Review Asset Requests"))
                {
                    permissionsList.filter(permissionList => permissionList !== "Review Asset Requests");
                }
            }


        }

        if (newCheckboxState[index] === false && subsystem === "Risks")
        {
            let permissionsCheckbox = document.querySelector('input.risksCreate');
            if (permissionsCheckbox.checked) {
                handleCreate(7);

                if (permissionsList.includes("Create Risks"))
                {
                    permissionsList.filter(permissionList => permissionList !== "Create Risks");
                }
            }

            permissionsCheckbox = document.querySelector('input.risksEdit');
            if (permissionsCheckbox.checked) {
                handleEdit(7);

                if (permissionsList.includes("Edit Risks"))
                {
                    permissionsList.filter(permissionList => permissionList !== "Edit Risks");
                }
            }

            permissionsCheckbox = document.querySelector('input.risksDelete');
            if (permissionsCheckbox.checked) {
                handleDelete(7);

                if (permissionsList.includes("Delete Risks"))
                {
                    permissionsList.filter(permissionList => permissionList !== "Delete Risks");
                }
            }

            permissionsCheckbox = document.querySelector('input.risksReview');
            if (permissionsCheckbox.checked) {
                handleReview(7);

                if (permissionsList.includes("Review Risks"))
                {
                    permissionsList.filter(permissionList => permissionList !== "Review Risks");
                }
            }
        }

        if (newCheckboxState[index] === false && subsystem === "Requests")
        {
            let permissionsCheckbox = document.querySelector('input.requestsAssetCreate');
            if (permissionsCheckbox.checked) {
                handleCreateAssetRequest(8);

                if (permissionsList.includes("Create Asset Requests"))
                {
                    permissionsList.filter(permissionList => permissionList !== "Create Asset Requests");
                }
            }

            permissionsCheckbox = document.querySelector('input.requestsSupportCreate');
            if (permissionsCheckbox.checked) {
                handleCreateSupportRequest(8);

                if (permissionsList.includes("Create Support Requests"))
                {
                    permissionsList.filter(permissionList => permissionList !== "Create Support Requests");
                }
            }

            permissionsCheckbox = document.querySelector('input.requestsAccessCreate');
            if (permissionsCheckbox.checked) {
                handleCreateAccessRequest(8);

                if (permissionsList.includes("Create Access Requests"))
                {
                    permissionsList.filter(permissionList => permissionList !== "Create Access Requests");
                }
            }


        }

    };


    const handleCreate = (index) => {
        const createAllowed = [...canCreate];
        createAllowed[index] = !createAllowed[index];
        setCanCreate(createAllowed);
    }

    const handleEdit = (index) => {
        const editAllowed = [...canEdit];
        editAllowed[index] = !editAllowed[index];
        setCanEdit(editAllowed);
    }

    const handleDelete = (index) => {
        const deleteAllowed = [...canDelete];
        deleteAllowed[index] = !deleteAllowed[index];
        setCanDelete(deleteAllowed);
    }

    const handleApprove = (index) => {
        const approveAllowed = [...canApprove];
        approveAllowed[index] = !approveAllowed[index];
        setCanApprove(approveAllowed);
    }

    const handleReview = (index) => {
        const reviewAllowed = [...canReview];
        reviewAllowed[index] = !reviewAllowed[index];
        setCanReview(reviewAllowed);
    }

    const handleViewAll = (index) => {
        const viewAllAllowed = [...canViewAll];
        viewAllAllowed[index] = !viewAllAllowed[index];
        setCanViewAll(viewAllAllowed);
    }
    const handleCreateSupportRequest = (index) => {
        const createSupportRequestAllowed = [...canCreateSupportRequest];
        createSupportRequestAllowed[index] = !createSupportRequestAllowed[index];
        setCanCreateSupportRequest(createSupportRequestAllowed);
    };
    const handleCreateAssetRequest = (index) => {
        const createAssetRequestAllowed = [...canCreateAssetRequest];
        createAssetRequestAllowed[index] = !createAssetRequestAllowed[index];
        setCanCreateAssetRequest(createAssetRequestAllowed);
    };

    const handleCreateAccessRequest = (index) => {
        const createAccessRequestAllowed = [...canCreateAccessRequest];
        createAccessRequestAllowed[index] = !createAccessRequestAllowed[index];
        setCanCreateAccessRequest(createAccessRequestAllowed);
    };

    const clearAll = () =>
    {
        let roleName =document.querySelector('input.roleCreationRoleNameInput');
        roleName.value = null;

        // for (let i = 0; i < 9; i++)
        // {
        //     if (checkboxState[i])
        //     {
        //         for (let j = 0; j < 9; j++)
        //         {
        //             handleCheckboxChecked(i, subsystems[j]);
        //         }
        //     }
        //
        // }
    }

    const submitInfo = () => {

        let roleName =document.querySelector('input.roleCreationRoleNameInput').value;
        // Send this also to backend.

        let permissionsCheckbox = document.querySelector('input.usersCreate');
        if (permissionsCheckbox.checked === true) {
            if (!permissionsList.includes("Create Users"))
            {
                permissionsList.push("Create Users");
                permissions += 1;
            }

        }

        permissionsCheckbox = document.querySelector('input.usersEdit');
        if (permissionsCheckbox.checked === true) {
            if (!permissionsList.includes("Edit Users"))
            {
                permissionsList.push("Edit Users");
                permissions += 2;
            }

        }

        permissionsCheckbox = document.querySelector('input.usersDelete');
        if (permissionsCheckbox.checked === true) {
            if (!permissionsList.includes("Delete Users"))
            {
                permissionsList.push("Delete Users");
                permissions += 4;
            }

        }

        permissionsCheckbox = document.querySelector('input.dataScopesCreate');
        if (permissionsCheckbox.checked === true) {
            if (!permissionsList.includes("Create Data Scopes"))
            {
                permissionsList.push("Create Data Scopes");
                permissions += 8;

            }

        }

        permissionsCheckbox = document.querySelector('input.dataScopesEdit');
        if (permissionsCheckbox.checked === true) {
            if (!permissionsList.includes("Edit Data Scopes"))
            {
                permissionsList.push("Edit Data Scopes");
                permissions += 16;
            }

        }

        permissionsCheckbox = document.querySelector('input.dataScopesDelete');
        if (permissionsCheckbox.checked === true) {
            if (!permissionsList.includes("Delete Data Scopes"))
            {
                permissionsList.push("Delete Data Scopes");
                permissions += 32;
            }

        }

        permissionsCheckbox = document.querySelector('input.accessRequestsEdit');
        if (permissionsCheckbox.checked === true) {
            if (!permissionsList.includes("Request Access Request"))
            {
                permissionsList.push("Edit Access Requests");
                permissions += 128;
            }

        }

        permissionsCheckbox = document.querySelector('input.accessRequestsApprove');
        if (permissionsCheckbox.checked === true) {
            if (!permissionsList.includes("Approve Access Requests"))
            {
                permissionsList.push("Approve Access Requests");
                permissions += 64;
            }

        }

        permissionsCheckbox = document.querySelector('input.tasksCreate');
        if (permissionsCheckbox.checked === true) {
            if (!permissionsList.includes("Create Tasks"))
            {
                permissionsList.push("Create Tasks");
                permissions += 256;
            }

        }

        permissionsCheckbox = document.querySelector('input.tasksEdit');
        if (permissionsCheckbox.checked === true) {
            if (!permissionsList.includes("Edit Tasks"))
            {
                permissionsList.push("Edit Tasks");
                permissions += 512;
            }

        }

        permissionsCheckbox = document.querySelector('input.tasksDelete');
        if (permissionsCheckbox.checked === true) {
            if (!permissionsList.includes("Delete Tasks"))
            {
                permissionsList.push("Delete Tasks");
                permissions += 1024;
            }

        }

        permissionsCheckbox = document.querySelector('input.tasksApprove');
        if (permissionsCheckbox.checked === true) {
            if (!permissionsList.includes("Approve Tasks"))
            {
                permissionsList.push("Approve Tasks");
                permissions += 2048;
            }

        }

        permissionsCheckbox = document.querySelector('input.devicesCreate');
        if (permissionsCheckbox.checked === true) {
            if (!permissionsList.includes("Create Devices"))
            {
                permissionsList.push("Create Devices");
                permissions += 4096;
            }

        }

        permissionsCheckbox = document.querySelector('input.devicesEdit');
        if (permissionsCheckbox.checked === true) {
            if (!permissionsList.includes("Edit Devices"))
            {
                permissionsList.push("Edit Devices");
                permissions += 8192;
            }

        }

        permissionsCheckbox = document.querySelector('input.devicesDelete');
        if (permissionsCheckbox.checked === true) {
            if (!permissionsList.includes("Delete Devices"))
            {
                permissionsList.push("Delete Devices");
                permissions += 16384;
            }

        }

        permissionsCheckbox = document.querySelector('input.supportRequestsViewAll');
        if (permissionsCheckbox.checked === true) {
            if (!permissionsList.includes("View All Support Requests"))
            {
                permissionsList.push("View All Support Requests");
                permissions += 32768;
            }

        }

        permissionsCheckbox = document.querySelector('input.supportRequestsEdit');
        if (permissionsCheckbox.checked === true) {
            if (!permissionsList.includes("Edit Support Requests"))
            {
                permissionsList.push("Edit Support Requests");
                permissions += 65536;
            }

        }

        permissionsCheckbox = document.querySelector('input.supportRequestsDelete');
        if (permissionsCheckbox.checked === true) {
            if (!permissionsList.includes("Delete Support Requests"))
            {
                permissionsList.push("Delete Support Requests");
                permissions += 131072;
            }

        }

        permissionsCheckbox = document.querySelector('input.assetRequestsReview');
        if (permissionsCheckbox.checked === true) {
            if (!permissionsList.includes("Review Asset Requests"))
            {
                permissionsList.push("Review Asset Requests");
                permissions += 33554432;
            }

        }

        permissionsCheckbox = document.querySelector('input.risksCreate');
        if (permissionsCheckbox.checked === true) {
            if (!permissionsList.includes("Create Risks"))
            {
                permissionsList.push("Create Risks");
                permissions += 262144;
            }

        }

        permissionsCheckbox = document.querySelector('input.risksEdit');
        if (permissionsCheckbox.checked === true) {
            if (!permissionsList.includes("Edit Risks"))
            {
                permissionsList.push("Edit Risks");
                permissions += 524288;
            }

        }

        permissionsCheckbox = document.querySelector('input.risksDelete');
        if (permissionsCheckbox.checked === true) {
            if (!permissionsList.includes("Delete Risks"))
            {
                permissionsList.push("Delete Risks");
                permissions += 2097152;
            }

        }

        permissionsCheckbox = document.querySelector('input.risksReview');
        if (permissionsCheckbox.checked === true) {
            if (!permissionsList.includes("Review Risks"))
            {
                permissionsList.push("Review Risks");
                permissions += 1048576;
            }

        }

        permissionsCheckbox = document.querySelector('input.requestsAssetCreate');
        if (permissionsCheckbox.checked === true) {
            if (!permissionsList.includes("Create Asset Requests"))
            {
                permissionsList.push("Create Asset Requests");
                permissions += 4194304;
            }

        }

        permissionsCheckbox = document.querySelector('input.requestsSupportCreate');
        if (permissionsCheckbox.checked === true) {
            if (!permissionsList.includes("Create Support Requests"))
            {
                permissionsList.push("Create Support Requests");
                permissions += 8388608;
            }

        }

        permissionsCheckbox = document.querySelector('input.requestsAccessCreate');
        if (permissionsCheckbox.checked === true) {
            if (!permissionsList.includes("Create Access Requests"))
            {
                permissionsList.push("Create Access Requests");
                permissions += 16777216;
            }

        }
        console.log(roleName, permissionsList)
    };

    const [helpOpen,setHelpOpen] = useState(false);
    const helpMsg = "Helper Message";
    const [showDiv1, setShowDiv1] = useState(true);
    const [showDiv2, setShowDiv2] = useState(false);
    const setDiv = () => {
        setShowDiv1(!showDiv1);
        setShowDiv2(!showDiv2);
    };
    return (
            <div className="display">
                {showDiv1 && (
                    <div className="roleBackground">
                        <button  className="roleHelpButton" onClick={() => setHelpOpen(true)}>
                            <IoHelpCircle className="roleHelpPopupIcon"></IoHelpCircle>
                            {helpOpen ? (
                                <HelpPopup
                                    popupClose={() => setHelpOpen(false)}
                                    popupOpen={helpOpen}
                                    image={role_help}
                                />
                            ) : null}
                        </button>
                        <div className="roleInfo">
                            <p className="roleCreateNameLabel">Role Name:</p>
                            <input
                                className="roleCreationRoleNameInput"
                                data-testid="roleCreationTest"
                                value={role_name}
                                onChange={(e) => setRoleName(e.target.value)}
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
                                                        className={`${subsystem.replace(/\s+/g, '')}Access`.replace(/^\w/, name => name.toLowerCase())}
                                                        onChange={() => handleCheckboxChecked(index, subsystem)}
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
                                                    }else if (subsystem === 'Tasks') {
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
                                                                            className={`${subsystem.replace(/\s+/g, '')}ViewAll`.replace(/^\w/, name => name.toLowerCase())}
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
                                                                            className={`${subsystem.replace(/\s+/g, '')}Review`.replace(/^\w/, name => name.toLowerCase())}
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
                                                                            className={`${subsystem.replace(/\s+/g, '')}Review`.replace(/^\w/, name => name.toLowerCase())}
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
                                                                            checked={canCreateAssetRequest[index]}
                                                                            onChange={() => handleCreateAssetRequest(index)}
                                                                            className={`${subsystem.replace(/\s+/g, '')}AssetCreate`.replace(/^\w/, name => name.toLowerCase())}
                                                                        />
                                                                        Create Asset Requests
                                                                    </label>
                                                                </div>
                                                                <div className="displayCreateDiv">
                                                                    <label className="accessLabels">
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={canCreateSupportRequest[index]}
                                                                            onChange={() => handleCreateSupportRequest(index)}
                                                                            className={`${subsystem.replace(/\s+/g, '')}SupportCreate`.replace(/^\w/, name => name.toLowerCase())}
                                                                        />
                                                                        Create Support Requests
                                                                    </label>
                                                                </div>
                                                                <div className="displayCreateDiv">
                                                                    <label className="accessLabels">
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={canCreateAccessRequest[index]}
                                                                            onChange={() => handleCreateAccessRequest(index)}
                                                                            className={`${subsystem.replace(/\s+/g, '')}AccessCreate`.replace(/^\w/, name => name.toLowerCase())}
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

                        <div className = "roleCreationButtonsDiv">
                            <button
                                className="roleCreationButton"
                                type = "submit"
                                onClick={handleClick}
                            >

                                Create Role
                            </button>
                            <button className="changeViewBtn" onClick={setDiv} id="changeViewBtn">View Roles</button>
                        </div>

                    </div>
                )}
                {showDiv2 && (
                    <div className="roleBackground">
                        <button className="roleHelpButton" onClick={() => setHelpOpen(true)}>
                            <IoHelpCircle className="roleHelpPopupIcon"></IoHelpCircle>
                            {helpOpen ? (
                                <HelpPopup
                                    popupClose={() => setHelpOpen(false)}
                                    popupOpen={helpOpen}
                                    message={helpMsg}
                                />
                            ) : null}
                        </button>
                        <div className="roleInfo">
                            <p className="roleCreateNameLabel">Current Roles:</p>
                        </div>
                        <div className="permissions">
                            <ul className="currRolesList">
                                {roleItems}
                            </ul>
                        </div>
                        <div className="roleCreationButtonsDiv">
                            <button className="changeViewBtn2" onClick={setDiv} id="changeViewBtn">Create Role</button>
                        </div>
                    </div>
                )}
        </div>

    );
};

export default RoleCreation;