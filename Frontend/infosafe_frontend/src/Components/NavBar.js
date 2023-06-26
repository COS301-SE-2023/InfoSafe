import '../Styling/NavBar.css';
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

/* eslint-disable react/prop-types */
const NavBar = ({ systemRole }) => {
    const [activeNavTab, activate] = useState(0);

    const [showUser, setShowUser] = useState([]);

    const [editUserOpen, setEditUserOpen] = useState(false);
    const [editDataScopeOpen, setEditDataScopeOpen] = useState(false);
    const [editDeviceOpen, setEditDeviceOpen] = useState(false);

    const handleClick = (NavTabIndex) => {
        activate(NavTabIndex);
    };

    /*  useEffect(()=>{
        fetch("http://localhost:8080/user/getAll")
            .then(res=>res.json())
            .then((result)=>{
                setShowUser(result);
            })
    },[])*/

    const ViewDataScopeItem = ({ id }) => {
        const [viewDataScopeOpen, setViewDataScopeOpen] = useState(false);
        const idValue = `Data Scope ${id}`;

        return (
            <li key={id}>
                <p className="listItem" onClick={() => setViewDataScopeOpen(!viewDataScopeOpen)}>
                    Data Scope {id}
                    {viewDataScopeOpen && (
                        <ViewDataScope
                            popupClose={() => setViewDataScopeOpen(false)}
                            popupOpen={viewDataScopeOpen}
                            id={idValue}
                        />
                    )}
                </p>
                <FaRegEdit className="EditIcon" onClick={() => setEditDataScopeOpen(true)} />
                {editDataScopeOpen ? (
                    <EditDataScopePopup
                        popupClose={() => setEditDataScopeOpen(false)}
                        popupOpen={editDataScopeOpen}
                        id={idValue}
                    />
                ) : null}{' '}
                <RiDeleteBin6Fill className="DeleteIcon" />
            </li>
        );
    };

    const ViewUserItem = ({ id }) => {
        const [viewUserOpen, setViewUserOpen] = useState(false);
        const idValue = `User ${id}`;

        return (
            <li key={id}>
                <p className="listItem" onClick={() => setViewUserOpen(!viewUserOpen)}>
                    User {id}
                    {viewUserOpen && (
                        <ViewUser
                            popupClose={() => setViewUserOpen(false)}
                            popupOpen={viewUserOpen}
                            id={idValue}
                        />
                    )}
                </p>
                <FaRegEdit className="EditIcon" onClick={() => setEditUserOpen(true)} />
                {editUserOpen ? (
                    <EditUser
                        popupClose={() => setEditUserOpen(false)}
                        popupOpen={editUserOpen}
                        id={idValue}
                    />
                ) : null}{' '}
                <RiDeleteBin6Fill className="DeleteIcon" />
            </li>
        );
    };

    const ViewDeviceItem = ({ id }) => {
        const [viewDeviceOpen, setViewDeviceOpen] = useState(false);
        const idValue = `Device ${id}`;

        return (
            <li key={id}>
                <p className="listItem" onClick={() => setViewDeviceOpen(!viewDeviceOpen)}>
                    Device {id}
                    {viewDeviceOpen && (
                        <ViewDevice
                            popupClose={() => setViewDeviceOpen(false)}
                            popupOpen={viewDeviceOpen}
                            id={idValue}
                        />
                    )}
                </p>
                <FaRegEdit className="EditIcon" onClick={() => setEditDeviceOpen(true)} />
                {editDeviceOpen ? (
                    <EditDevice
                        popupClose={() => setEditDeviceOpen(false)}
                        popupOpen={editDeviceOpen}
                        id={idValue}
                    />
                ) : null}{' '}
                <RiDeleteBin6Fill className="DeleteIcon" />
            </li>
        );
    };

    const displayInfo = () => {
        if (systemRole === 'ISO') {
            switch (activeNavTab) {
                case 0: {
                    const userItems = [];
                    for (let i = 1; i < 30; i++) {
                        userItems.push(<ViewUserItem id={i} />);
                    }

                    return (
                        <div className="users">
                            <ul className="userList">{userItems}</ul>
                        </div>
                        /*<div className="users">
                            <ul className="userList">
                                {
                                    showUser.map(user=>(
                                        <li key={user.id}>
                                            <p onClick={() => setViewUserOpen(true)}>
                                                {/!*{user.name}*!/}
                                                {/!*{user.surname}*!/}
                                                {viewUserOpen ? (
                                                    <ViewUser
                                                        closeViewUser={() => setViewUserOpen(false)}
                                                        openViewUser={viewUserOpen}
                                                    />
                                                ) : null}
                                            </p>
                                            <FaRegEdit
                                                className="EditIcon"
                                                onClick={() => setEditUserOpen(true)}
                                            />
                                            {editUserOpen ? (
                                                <EditUser
                                                    closeEditUser={() => setEditUserOpen(false)}
                                                    openEditUser={editUserOpen}
                                                />
                                            ) : null}{' '}
                                            <RiDeleteBin6Fill className="DeleteIcon" />
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>*/
                    );
                }
                case 1: {
                    const dataItems = [];
                    for (let j = 1; j < 30; j++) {
                        dataItems.push(<ViewDataScopeItem id={j} />);
                    }

                    return (
                        <div className="datascopes">
                            <ul className="datascopesList">{dataItems}</ul>
                        </div>
                    );
                }
                case 2: {
                    const accessRequests = [];
                    for (let k = 1; k < 30; k++) {
                        accessRequests.push(
                            <li key={k}>
                                Access Request {k} <FaRegEdit className="EditIcon" />{' '}
                                <RiDeleteBin6Fill className="DeleteIcon" />
                            </li>
                        );
                    }
                    return (
                        <div className="accessRequests">
                            <ul className="accessrequestsList">{accessRequests}</ul>
                        </div>
                    );
                }
                case 3: {
                    const complianceItems = [];
                    for (let l = 1; l < 30; l++) {
                        complianceItems.push(<li key={l}>Task {l}</li>);
                    }
                    return (
                        <div className="tasks">
                            <ul className="taskList">{complianceItems}</ul>
                        </div>
                    );
                }
                case 4: {
                    const devices = [];
                    for (let m = 0; m < 26; m++) {
                        devices.push(<ViewDeviceItem id={m} />);
                    }
                    return (
                        <div className="devices">
                            <ul className="deviceList">{devices}</ul>
                        </div>
                    );
                }
                case 5: {
                    const active_requests = [];
                    for (let a = 1; a < 15; a++) {
                        active_requests.push(
                            <li key={a}>
                                Support Request {a} <FaRegEdit className="EditIcon" />
                            </li>
                        );
                    }
                    const my_requests = [];
                    for (let b = 1; b < 15; b++) {
                        my_requests.push(
                            <li key={b}>
                                Support Request {b} <FaRegEdit className="EditIcon" />
                            </li>
                        );
                    }

                    return (
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
                    );
                }
                case 6:
                    //Add risks info here
                    return null;
                default:
                    return null;
            }
        }
    };

    const [createUserOpen, setCreateUserOpen] = useState(false);
    const [createDataScopeOpen, setCreateDataScopeOpen] = useState(false);
    const [createDeviceOpen, setCreateDeviceOpen] = useState(false);
    const displayButtons = () => {
        if (systemRole === 'ISO') {
            switch (activeNavTab) {
                case 0:
                    return (
                        <div className="CreateUserButtonDiv">
                            <button
                                className="CreateUserButton"
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
                    );
                case 1:
                    return (
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
                    );
                case 3:
                    return (
                        <div className="buttons">
                            <button
                                className="CreateTaskButton"
                                onClick={() => console.log('Created new task')}
                            >
                                Create New User
                            </button>
                            <button
                                className="UpdateTaskButton"
                                onClick={() => console.log('Updated task.')}
                            >
                                Update Task
                            </button>
                            <button
                                className="RevokeTaskButton"
                                onClick={() => console.log('Revoked task.')}
                            >
                                Revoke Task
                            </button>
                        </div>
                    );
                case 4:
                    return (
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
                    );
                case 5:
                    return (
                        <button
                            className="CreateSupportRequestButton"
                            onClick={() => console.log('Create new support request.')}
                        >
                            Create New Request
                        </button>
                    );
                default:
                    return null;
            }
        }
    };

    return (
        <div className="navbar">
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
            </ul>

            <div className="display">
                {displayInfo()}
                {displayButtons()}
            </div>
        </div>
    );
};

export default NavBar;
