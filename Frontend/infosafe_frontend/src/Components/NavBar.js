import '../Styling/NavBar.css';
import React, { useState } from 'react';
import {FaRegEdit} from 'react-icons/fa';
import {RiDeleteBin6Fill} from 'react-icons/ri';
/* eslint-disable react/prop-types */
const NavBar = ({systemRole}) => {
    const [activeNavTab, activate] = useState(0);

    const handleClick = (NavTabIndex) => {
        activate(NavTabIndex);
    };

    const displayInfo = () => {

        if (systemRole === 'ISO')
        {
            switch (activeNavTab) {
                case 0: {
                    const userItems = [];
                    for (let i = 1; i < 30; i++) {
                        userItems.push(<li key={i}>User {i} <FaRegEdit className="EditIcon" /> <RiDeleteBin6Fill className="DeleteIcon" /></li>);
                    }

                    return (
                        <div className="users">
                            <ul className="userList">{userItems}</ul>
                        </div>
                    );
                }
                case 1: {
                    const dataItems = [];
                    for (let j = 1; j < 30; j++) {
                        dataItems.push(<li key={j}>Data Scope {j}</li>);
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
                        accessRequests.push(<li key={k}>Access Request {k}</li>);
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
                        devices.push(<li key={m}>Device {String.fromCharCode(m + 65)}</li>);
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
                        active_requests.push(<li key={a}>Support Request {a}</li>);
                    }
                    const my_requests = [];
                    for (let b = 1; b < 15; b++) {
                        my_requests.push(<li key={b}>Support Request {b}</li>);
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

    const displayButtons = () => {

        if (systemRole === 'ISO')
        {
            switch (activeNavTab) {
                case 0:
                    return (

                        <button className='CreateUserButton' onClick={() => console.log('Created new User')}>
                            Create New User
                        </button>
                    );
                case 3:
                    return (
                        <div className="buttons">
                            <button className='CreateTaskButton' onClick={() => console.log('Created new task')}>
                                Create New User
                            </button>
                            <button className='UpdateTaskButton' onClick={() => console.log('Updated task.')}>
                                Update Task
                            </button>
                            <button className='RevokeTaskButton' onClick={() => console.log('Revoked task.')}>
                                Revoke Task
                            </button>
                        </div>
                    );
                case 4:
                    return (
                        <button className='AddDeviceButton' onClick={() => console.log('Added new device')}>
                            Add Device
                        </button>
                    );
                case 5:
                    return (
                        <button className='CreateSupportRequestButton' onClick={() => console.log('Create new support request.')}>
                            Create New Request
                        </button>
                    );
                default:
                    return null;
            }
        }

    };

    return (
        <div className='navbar'>
            <ul className = "tabs">
                <li className={activeNavTab === 0 ? 'active' : ''} onClick={() => handleClick(0) }>Users</li>
                <li className={activeNavTab === 1 ? 'active' : ''} onClick={() => handleClick(1) }>Data Scopes</li>
                <li className={activeNavTab === 2 ? 'active' : ''} onClick={() => handleClick(2) }>Access Requests</li>
                <li className={activeNavTab === 3 ? 'active' : ''} onClick={() => handleClick(3) }>Compliance Matrix</li>
                <li className={activeNavTab === 4 ? 'active' : ''} onClick={() => handleClick(4) }>Devices</li>
                <li className={activeNavTab === 5 ? 'active' : ''} onClick={() => handleClick(5) }>Support Requests</li>
                <li className={activeNavTab === 6 ? 'active' : ''} onClick={() => handleClick(6) }>Risks</li>
            </ul>

            <div className="display">
                {displayInfo()}
                {displayButtons()}
            </div>
        </div>
    );
};

export default NavBar;
