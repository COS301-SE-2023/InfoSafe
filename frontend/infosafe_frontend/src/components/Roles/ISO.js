import '../../styling/ISO.css';
import '../../styling/Dropdown.css';
import React, { useEffect, useState } from 'react';
import {FaRegEdit} from 'react-icons/fa';
import {RiDeleteBin6Fill} from 'react-icons/ri';
import {CreateUserPopup} from '../Create/CreateUserPopup';
import ViewUser from '../View/ViewUser';
import EditUser from '../Edit/EditUser';
import ViewDataScope from '../View/ViewDataScope';
import {EditDataScopePopup} from '../Edit/EditDataScopePopup';
import ViewAccessRequest from '../View/ViewAccessRequest';
import EditAccessRequest from '../Edit/EditAccessRequest';
import {CreateTask} from '../Create/CreateTaskPopup';
import {UpdateTask} from '../UpdateTaskPopup';
import {ViewTask} from '../View/ViewTaskPopup';
import {CreateDevicePopup} from '../Create/CreateDevicePopup';
import {ViewDevice} from '../View/ViewDevice';
import EditDevice from '../Edit/EditDevice';
import ViewSupportRequest from '../View/ViewSupportRequest';
import EditSupportRequest from '../Edit/EditSupportRequest';
import {ReviewRisk} from "../ReviewRiskPopup";
import {CreateRisk} from "../Create/CreateRiskPopup";
import Requests from '../Requests';
import {TaskApproval} from "../TaskApprovalPopup";
import {ViewRisk} from "../View/ViewRisk";
import {EditRisk} from "../Edit/EditRisk";
import AccessAndDisplay from "./AccessAndDisplay";
/* eslint-disable react/prop-types */

const ISO = ({currentTab}) => {
    const {showUser,showDatascope, setShowDatascope, showAsset, setShowAsset, showRisk, setShowRisk, showAccess, setShowAccess, createUserOpen, setCreateUserOpen} = AccessAndDisplay()
    const [viewAccessRequestOpen, setViewAccessRequestOpen] = useState(false); // ISO DISO
    const [editAccessRequestOpen, setEditAccessRequestOpen] = useState(false); // ISO DISO
    const [updateTaskOpen, setUpdateTaskOpen] = useState(false); // ISO DISO
    const [viewTaskOpen, setViewTaskOpen] = useState(false); // ISO DS DISO Employee AM
    const [createTaskOpen, setCreateTaskOpen] = useState(false); // ISO DISO
    const [createDeviceOpen, setCreateDeviceOpen] = useState(false); // ISO DISO AM
    const [viewSupportRequestOpen, setViewSupportRequestOpen] = useState(false); // ISO DISO Employee AM
    const [editSupportRequestOpen, setEditSupportRequestOpen] = useState(false); // ISO DISO
    const [createRiskOpen, setCreateRiskOpen] = useState(false); // ISO DISO
    const [reviewRiskOpen, setReviewRiskOpen] = useState(false); // ISO DISO
    const [viewRiskOpen, setViewRiskOpen] = useState(false); // ISO DISO DS
    const [editRiskOpen, setEditRiskOpen] = useState(false); // ISO DS DISO
    const [approveTaskOpen, setApproveTaskOpen] = useState(false);

    const ViewUserItem = ({ user }) => {
        //const CURRENT = user;
        const [viewUserOpen, setViewUserOpen] = useState(false);
        const [editUserOpen, setEditUserOpen] = useState(false);
        return (
            <li key={user.id}>
                <p onClick={() => setViewUserOpen(!viewUserOpen)}>
                    User {user.id}: {user.name} {user.surname}
                    {viewUserOpen && (
                        <ViewUser
                            popupClose={() => setViewUserOpen(false)}
                            popupOpen={viewUserOpen}
                            user={user}
                        />
                    )}
                </p>
                <FaRegEdit className="EditIcon" onClick={() => setEditUserOpen(true)} />
                {editUserOpen ? (
                    <EditUser
                        popupClose={() => setEditUserOpen(false)}
                        popupOpen={editUserOpen}
                        user={user}
                    />
                ) : null}{' '}
                <RiDeleteBin6Fill className="DeleteIcon" />
            </li>
        );
    };

    const ViewDataScopeItem = ({ datascope }) => {
        const [viewDataScopeOpen, setViewDataScopeOpen] = useState(false);
        const [editDataScopeOpen, setEditDataScopeOpen] = useState(false);
        return (
            <li key={datascope.id}>
                <p onClick={() => setViewDataScopeOpen(!viewDataScopeOpen)}>
                    Data Scope {datascope.id}: {datascope.ds_name} ------ {datascope.description}{' '}
                    ------ {datascope.data_custodian}
                    {viewDataScopeOpen && (
                        <ViewDataScope
                            popupClose={() => setViewDataScopeOpen(false)}
                            popupOpen={viewDataScopeOpen}
                            datascope={datascope}
                        />
                    )}
                </p>
                <FaRegEdit className="EditIcon" onClick={() => setEditDataScopeOpen(true)} />
                {editDataScopeOpen ? (
                    <EditDataScopePopup
                        popupClose={() => setEditDataScopeOpen(false)}
                        popupOpen={editDataScopeOpen}
                        datascope={datascope}
                    />
                ) : null}{' '}
                <RiDeleteBin6Fill className="DeleteIcon" />
            </li>
        );
    };

    const ViewDeviceItem = ({ asset }) => {
        const [editDeviceOpen, setEditDeviceOpen] = useState(false);
        const [viewDeviceOpen, setViewDeviceOpen] = useState(false);
        return (
            <li key={asset.id}>
                <p onClick={() => setViewDeviceOpen(!viewDeviceOpen)}>
                    Asset {asset.id}: {asset.asset_name} ----- {asset.asset_description}
                    {viewDeviceOpen && (
                        <ViewDevice
                            popupClose={() => setViewDeviceOpen(false)}
                            popupOpen={viewDeviceOpen}
                            asset={asset}
                        />
                    )}
                </p>
                <FaRegEdit className="EditIcon" onClick={() => setEditDeviceOpen(true)} />
                {editDeviceOpen ? (
                    <EditDevice
                        popupClose={() => setEditDeviceOpen(false)}
                        popupOpen={editDeviceOpen}
                        asset={asset}
                    />
                ) : null}{' '}
                <RiDeleteBin6Fill className="DeleteIcon" />
            </li>
        );
    };

    if (currentTab === 0)
    {
        const userItems = [];
        showUser.map((user) => userItems.push(<ViewUserItem user={user} key={user.id} />));

        return (
            <div className="display">
                <div className="users">
                    <ul className="userList">{userItems}</ul>
                </div>
                <div className="CreateUserButtonDiv">
                    <button
                        className="CreateUserButton"
                        data-testid="CreateUserButton"
                        onClick={() => setCreateUserOpen(true)}
                    >
                        Create New User
                    </button>
                    {createUserOpen ? (
                        <CreateUserPopup
                            popupClose={() => setCreateUserOpen(false)}
                            popupOpen={createUserOpen}
                        />
                    ) : null}
                </div>
            </div>
        );
    }

    if (currentTab === 1)
    {
        const dataItems = [];
        showDatascope.map((datascope) =>
            dataItems.push(<ViewDataScopeItem datascope={datascope} key={datascope.id} />)
        );

        return (
            <div className="display">
                <div className="datascopes">
                    <ul className="datascopesList">{dataItems}</ul>
                </div>
                {/*<div className="CreateDataScopeDiv">*/}
                {/*    <button*/}
                {/*        className="CreateDataScopeButton"*/}
                {/*        onClick={() => setCreateDataScopeOpen(true)}*/}
                {/*    >*/}
                {/*        Create Data Scope*/}
                {/*    </button>*/}
                {/*    {createDataScopeOpen ? (*/}
                {/*        <CreateDataScopePopup*/}
                {/*            popupClose={() => setCreateDataScopeOpen(false)}*/}
                {/*            popupOpen={createDataScopeOpen}*/}
                {/*        />*/}
                {/*    ) : null}*/}
                {/*</div>*/}
            </div>
        );
    }

    if (currentTab === 2)
    {
        const accessRequests = [];
        for (let k = 1; k < 30; k++) {
            accessRequests.push(
                <li key={k}>
                    <p onClick={() => setViewAccessRequestOpen(true)}>
                        Access Request {k}
                        {viewAccessRequestOpen ? (
                            <ViewAccessRequest
                                popupClose={() => setViewAccessRequestOpen(false)}
                                popupOpen={viewAccessRequestOpen}
                            />
                        ) : null}
                    </p>
                    <FaRegEdit
                        className="EditIcon"
                        onClick={() => setEditAccessRequestOpen(true)}
                    />
                    {editAccessRequestOpen ? (
                        <EditAccessRequest
                            popupClose={() => setEditAccessRequestOpen(false)}
                            popupOpen={editAccessRequestOpen}
                        />
                    ) : null}
                    <RiDeleteBin6Fill className="DeleteIcon" />
                </li>
            );
        }
        return (
            <div className="display">
                <div className="accessRequests">
                    <ul className="accessrequestsList">{accessRequests}</ul>
                </div>
            </div>
        );
    }

    if (currentTab === 3)
    {
        const complianceItems = [];
        for (let l = 1; l < 30; l++) {
            complianceItems.push(
                <li key={l}>
                    <p onClick={() => setViewTaskOpen(true)}>
                        Task {l}
                        {viewTaskOpen ? (
                            <ViewTask
                                popupClose={() => setViewTaskOpen(false)}
                                popupOpen={viewTaskOpen}
                            />
                        ) : null}
                    </p>
                </li>
            );
        }
        return (
            <div className="display">
                <div className="tasks">
                    <ul className="taskList">{complianceItems}</ul>
                </div>
                <div className="buttons">
                    <div className="CreateTaskDiv">
                        <button
                            className="CreateTaskButton"
                            onClick={() => setCreateTaskOpen(true)}
                        >
                            Create New Task
                        </button>
                        {createTaskOpen ? (
                            <CreateTask
                                popupClose={() => setCreateTaskOpen(false)}
                                popupOpen={createTaskOpen}
                            />
                        ) : null}
                    </div>
                    <div className="UpdateTaskDiv">
                        <button
                            className="UpdateTaskButton"
                            onClick={() => setUpdateTaskOpen(true)}
                        >
                            Update Task
                        </button>
                        {updateTaskOpen ? (
                            <UpdateTask
                                popupClose={() => setUpdateTaskOpen(false)}
                                popupOpen={updateTaskOpen}
                            />
                        ) : null}
                    </div>
                    <div className="ApproveTaskDiv">
                        <button
                            className="ApproveTaskButton"
                            onClick={() => setApproveTaskOpen(true)}
                        >
                            Task Approval
                        </button>
                        {approveTaskOpen ? (
                            <TaskApproval
                                popupClose={() => setApproveTaskOpen(false)}
                                popupOpen={approveTaskOpen}
                            />
                        ) : null}
                    </div>
                </div>
            </div>
        );
    }

    if (currentTab === 4)
    {
        const devices = [];
        showAsset.map((device) =>
            devices.push(<ViewDeviceItem asset={device} key={device.id} />)
        );
        return (
            <div className="display">
                <div className="devices">
                    <ul className="deviceList">{devices}</ul>
                </div>
                <div className="AddDeviceDiv">
                    <button
                        className="AddDeviceButton"
                        onClick={() => setCreateDeviceOpen(true)}
                    >
                        Add Device
                    </button>
                    {createDeviceOpen ? (
                        <CreateDevicePopup
                            popupClose={() => setCreateDeviceOpen(false)}
                            popupOpen={createDeviceOpen}
                        />
                    ) : null}
                </div>
            </div>
        );
    }

    if (currentTab === 5)
    {
        const active_requests = [];
        for (let a = 1; a < 15; a++) {
            active_requests.push(
                <li key={a}>
                    <p onClick={() => setViewSupportRequestOpen(true)}>
                        Support Request {a}
                        {viewSupportRequestOpen ? (
                            <ViewSupportRequest
                                popupClose={() => setViewSupportRequestOpen(false)}
                                popupOpen={viewSupportRequestOpen}
                            />
                        ) : null}
                    </p>
                    <FaRegEdit
                        className="EditIcon"
                        onClick={() => setEditSupportRequestOpen(true)}
                    />
                    {editSupportRequestOpen ? (
                        <EditSupportRequest
                            popupClose={() => setEditSupportRequestOpen(false)}
                            popupOpen={editSupportRequestOpen}
                        />
                    ) : null}
                </li>
            );
        }
        const my_requests = [];
        for (let b = 1; b < 15; b++) {
            my_requests.push(
                <li key={b}>
                    <p onClick={() => setViewSupportRequestOpen(true)}>
                        Support Request {b}
                        {viewSupportRequestOpen ? (
                            <ViewSupportRequest
                                popupClose={() => setViewSupportRequestOpen(false)}
                                popupOpen={viewSupportRequestOpen}
                            />
                        ) : null}
                    </p>{' '}
                    <FaRegEdit
                        className="EditIcon"
                        onClick={() => setEditSupportRequestOpen(true)}
                    />
                    {editSupportRequestOpen ? (
                        <EditSupportRequest
                            popupClose={() => setEditSupportRequestOpen(false)}
                            popupOpen={editSupportRequestOpen}
                        />
                    ) : null}
                </li>
            );
        }

        return (
            <div className="display">
                <div>
                    <div className="titles">
                        <div className="activeHeader">
                            <p>Active System Requests</p>
                        </div>
                        <div className="myHeader">
                            <p>My Requests</p>
                        </div>
                    </div>

                    <div className="tables">
                        <div className="active_support_requests">
                            <ul className="activeRequestsList">{active_requests}</ul>
                        </div>
                        <div className="my_support_requests">
                            <ul className="myRequestsList">{my_requests}</ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (currentTab === 6)
    {
        const risks = [];
        for (let y = 1; y < 30; y++) {
            risks.push(
                <li key={y}>
                    <p onClick={() => setViewRiskOpen(true)}>
                        Risk {y}
                        {viewRiskOpen ? (
                            <ViewRisk
                                popupClose={() => setViewRiskOpen(false)}
                                popupOpen={viewRiskOpen}
                            />
                        ) : null}
                    </p>
                    <FaRegEdit
                        className="ISOEditIcon"
                        onClick={() => setEditRiskOpen(true)}
                    />
                    {editRiskOpen ? (
                        <EditRisk
                            popupClose={() => setEditRiskOpen(false)}
                            popupOpen={editRiskOpen}
                        />
                    ) : null}
                    <button
                        className="ISOReviewRiskButton"
                        onClick={() => setReviewRiskOpen(true)}
                    >
                        Review
                    </button>
                    {reviewRiskOpen ? (
                        <ReviewRisk
                            popupClose={() => setReviewRiskOpen(false)}
                            popupOpen={reviewRiskOpen}
                        />
                    ) : null}
                </li>
            );
        }
        return (
            <div className="display">
                <div className="risks">
                    <ul className="risksList">{risks}</ul>
                </div>
                <div className="CreateRiskButtonDiv">
                    <button
                        className="CreateRiskButton"
                        data-testid="CreateRiskButton"
                        onClick={() => setCreateRiskOpen(true)}
                    >
                        Create Risk
                    </button>
                    {createRiskOpen ? (
                        <CreateRisk
                            popupClose={() => setCreateRiskOpen(false)}
                            popupOpen={createRiskOpen}
                        />
                    ) : null}
                </div>
            </div>
        );
    }

    if (currentTab === 7)
    {
        return <Requests userRole="ISO" />;
    }


};

export default ISO;