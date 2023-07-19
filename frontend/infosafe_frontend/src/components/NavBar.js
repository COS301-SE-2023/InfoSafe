import '../styling/NavBar.css';
import React, { useEffect, useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { CreateUserPopup } from './CreateUserPopup';
import { CreateDataScopePopup } from './CreateDataScopePopup';
import { EditDataScopePopup } from './EditDataScopePopup';
import EditUser from './EditUser';
import ViewDataScope from './ViewDataScope';
import ViewUser from './ViewUser';
import { CreateDevicePopup } from './CreateDevicePopup';
import { ViewDevice } from './ViewDevice';
import EditDevice from './EditDevice';
import '../styling/Dropdown.css';
import { CreateTask } from './CreateTaskPopup';
import { UpdateTask } from './UpdateTaskPopup';
import ViewAccessRequest from './ViewAccessRequest';
import EditAccessRequest from './EditAccessRequest';
import Requests from './Requests';
import { ViewTask } from './ViewTaskPopup';
import ViewSupportRequest from './ViewSupportRequest';
import EditSupportRequest from './EditSupportRequest';
import {ReviewRisk} from "./ReviewRiskPopup";
import {CreateRisk} from "./CreateRiskPopup";

/* eslint-disable react/prop-types */
const NavBar = ({ systemRole }) => {
    const [activeNavTab, activate] = useState(0);
    const [showUser, setShowUser] = useState([]);
    const [showDatascope, setShowDatascope] = useState([]);
    const [showAsset, setShowAsset] = useState([]);
    const [createUserOpen, setCreateUserOpen] = useState(false);
    const [createDataScopeOpen, setCreateDataScopeOpen] = useState(false);
    const [createDeviceOpen, setCreateDeviceOpen] = useState(false);
    const [createTaskOpen, setCreateTaskOpen] = useState(false);
    const [createRiskOpen, setCreateRiskOpen] = useState(false);
    const [updateTaskOpen, setUpdateTaskOpen] = useState(false);
    const [viewAccessRequestOpen, setViewAccessRequestOpen] = useState(false);
    const [editAccessRequestOpen, setEditAccessRequestOpen] = useState(false);
    const [viewTaskOpen, setViewTaskOpen] = useState(false);
    const [viewSupportRequestOpen, setViewSupportRequestOpen] = useState(false);
    const [editSupportRequestOpen, setEditSupportRequestOpen] = useState(false);
    const [reviewRiskOpen, setReviewRiskOpen] = useState(false);
    const handleClick = (NavTabIndex) => {
        activate(NavTabIndex);
    };

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

    /*    const ViewTaskItem = ( l ) => {
        const [viewTaskOpen, setViewTaskOpen] = useState(false);
        return (
            <li key={l}>
                <p onClick={() => setViewTaskOpen(!viewTaskOpen)}>
                    Task {l}
                    {viewTaskOpen && (
                        <ViewTask
                            popupClose={() => setViewTaskOpen(false)}
                            popupOpen={viewTaskOpen}
                        />
                    )}
                </p>
            </li>
        );
    };*/

    const displayPage = () => {
        if (systemRole === 'ISO') {
            return (
                <div className="navbar">
                    {displayISOTabs()}
                    {displayISOPage()}
                </div>
            );
        }
    };

    const displayISOTabs = () => {
        return (
            <ul className="tabs">
                <li className={activeNavTab === 0 ? 'active' : ''} onClick={() => handleClick(0)}>
                    Users
                </li>
                <li className={activeNavTab === 1 ? 'active' : ''} onClick={() => handleClick(1)}>
                    Data Scopes
                </li>
                <li className={activeNavTab === 2 ? 'active' : ''} onClick={() => handleClick(2)}>
                    Access Requests
                </li>
                <li className={activeNavTab === 3 ? 'active' : ''} onClick={() => handleClick(3)}>
                    Compliance Matrix
                </li>
                <li className={activeNavTab === 4 ? 'active' : ''} onClick={() => handleClick(4)}>
                    Devices
                </li>
                <li className={activeNavTab === 5 ? 'active' : ''} onClick={() => handleClick(5)}>
                    Support Requests
                </li>
                <li className={activeNavTab === 6 ? 'active' : ''} onClick={() => handleClick(6)}>
                    Risks
                </li>
                <li className={activeNavTab === 7 ? 'active' : ''} onClick={() => handleClick(7)}>
                    Requests
                </li>
            </ul>
        );
    };
    const displayISOPage = () => {
        switch (activeNavTab) {
            case 0: {
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
            case 1: {
                const dataItems = [];
                showDatascope.map((datascope) =>
                    dataItems.push(<ViewDataScopeItem datascope={datascope} key={datascope.id} />)
                );

                return (
                    <div className="display">
                        <div className="datascopes">
                            <ul className="datascopesList">{dataItems}</ul>
                        </div>
                        <div className="CreateDataScopeDiv">
                            <button
                                className="CreateDataScopeButton"
                                onClick={() => setCreateDataScopeOpen(true)}
                            >
                                Create Data Scope
                            </button>
                            {createDataScopeOpen ? (
                                <CreateDataScopePopup
                                    popupClose={() => setCreateDataScopeOpen(false)}
                                    popupOpen={createDataScopeOpen}
                                />
                            ) : null}
                        </div>
                    </div>
                );
            }
            case 2: {
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
            case 3: {
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
                            <div className="RevokeTaskDiv">
                                <button
                                    className="RevokeTaskButton"
                                    onClick={() => console.log('Revoked task.')}
                                >
                                    Revoke Task
                                </button>
                            </div>
                        </div>
                    </div>
                );
            }
            case 4: {
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
            case 5: {
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
            case 6: {
                const risks = [];
                for (let y = 1; y < 30; y++) {
                    risks.push(
                        <li key={y}>
                            Risk {y}
                            <button
                                className="reviewRiskButton"
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
            case 7: {
                return <Requests userRole="ISO" />;
            }
            default:
                return null;
        }
    };

    return displayPage();
};

export default NavBar;
