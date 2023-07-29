import '../styling/ISO.css';
import React, { useEffect, useState } from 'react';
import {FaRegEdit} from 'react-icons/fa';
import {RiDeleteBin6Fill} from 'react-icons/ri';
import {CreateUserPopup} from './CreateUserPopup';
import ViewUser from './ViewUser';
import EditUser from './EditUser';
import ViewDataScope from './ViewDataScope';
import {EditDataScopePopup} from './EditDataScopePopup';
import ViewAccessRequest from './ViewAccessRequest';
import EditAccessRequest from './EditAccessRequest';
import {CreateTask} from './CreateTaskPopup';
import {UpdateTask} from './UpdateTaskPopup';
import {ViewTask} from './ViewTaskPopup';
import {CreateDevicePopup} from './CreateDevicePopup';
import {ViewDevice} from './ViewDevice';
import EditDevice from './EditDevice';
import ViewSupportRequest from './ViewSupportRequest';
import EditSupportRequest from './EditSupportRequest';
import {ReviewRisk} from "./ReviewRiskPopup";
import {CreateRisk} from "./CreateRiskPopup";
import Requests from './Requests';
import '../styling/Dropdown.css';
import {TaskApproval} from "./TaskApprovalPopup";
import {ViewRisk} from "./ViewRisk";
import {EditRisk} from "./EditRisk";
/* eslint-disable react/prop-types */

const ISO = ({currentTab}) => {
    const [createUserOpen, setCreateUserOpen] = useState(false);
    const [showUser, setShowUser] = useState([]);
    const [showDatascope, setShowDatascope] = useState([]);
    const [viewAccessRequestOpen, setViewAccessRequestOpen] = useState(false);
    const [editAccessRequestOpen, setEditAccessRequestOpen] = useState(false);
    const [updateTaskOpen, setUpdateTaskOpen] = useState(false);
    const [viewTaskOpen, setViewTaskOpen] = useState(false);
    const [createTaskOpen, setCreateTaskOpen] = useState(false);
    const [createDeviceOpen, setCreateDeviceOpen] = useState(false);
    const [viewSupportRequestOpen, setViewSupportRequestOpen] = useState(false);
    const [editSupportRequestOpen, setEditSupportRequestOpen] = useState(false);
    const [createRiskOpen, setCreateRiskOpen] = useState(false);
    const [reviewRiskOpen, setReviewRiskOpen] = useState(false);
    const [showAsset, setShowAsset] = useState([]);
    const [approveTaskOpen, setApproveTaskOpen] = useState(false);
    const [viewRiskOpen, setViewRiskOpen] = useState(false);
    const [editRiskOpen, setEditRiskOpen] = useState(false);

    useEffect(() => {
        fetch('http://localhost:8080/api/user/getAll', {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            }
        })
            .then((res) => res.json())
            .then((result) => {
                setShowUser(result);
            });
    }, []);

    useEffect(() => {
        fetch('http://localhost:8080/api/datascope/getDs', {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            }
        })
            .then((res) => res.json())
            .then((result) => {
                setShowDatascope(result);
            });
    }, []);

    useEffect(() => {
        fetch('http://localhost:8080/api/asset/getAsset', {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            }
        })
            .then((res) => res.json())
            .then((result) => {
                setShowAsset(result);
            });
    }, []);
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
                <FaRegEdit className="ISODeviceEditIcon" onClick={() => setEditDeviceOpen(true)} />
                {editDeviceOpen ? (
                    <EditDevice
                        popupClose={() => setEditDeviceOpen(false)}
                        popupOpen={editDeviceOpen}
                        asset={asset}
                    />
                ) : null}
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