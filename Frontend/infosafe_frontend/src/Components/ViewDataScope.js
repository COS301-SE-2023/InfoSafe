import Popup from 'reactjs-popup';
import React from 'react';
import '../Styling/ViewDataScope.css';
import { FaRegEdit } from 'react-icons/fa';
import { IoArrowBackOutline } from 'react-icons/io5';
/* eslint-disable react/prop-types */

const ViewDataScope = ({ id, popupClose, popupOpen }) => {
    return (
        <Popup open={popupOpen} closeOnDocumentClick={false} position="center center">
            <div className="viewDataScopeOverlay">
                <div className="borderDataScopeView">
                    <button className="backButton" onClick={popupClose}>
                        <IoArrowBackOutline className="backIcon" />
                    </button>
                    <p className="ViewDataScopeTitle">View Data Scope</p>
                    <div className="view_datascope_name">
                        <p className="datascopeName">Name</p>
                        <p className="viewDataScopeName">{id}</p>
                    </div>
                    <div className="view_datascope_description">
                        <p className="datascopeDescription">Description</p>
                        <p className="viewDSDescription">Important description here.</p>
                    </div>
                    <div className="view_datascope_date">
                        <p className="datascopeDate">Date Captured</p>
                        <p className="viewDataScopeDate">2023-01-01</p>
                    </div>
                    <div className="view_datascope_status">
                        <p className="datascopeStatus">Status</p>
                        <p className="viewDataScopeStatus">Active</p>
                    </div>
                    <div className="view_datascope_roles">
                        <p className="datascopeRoles">Roles</p>
                        <div className="roleView">
                            <div className="headers">
                                <p className="header_1">User</p>
                                <p className="header_2">Role</p>
                            </div>
                            <div className="role_info">
                                <p className="usr">John Doe</p>
                                <p className="usr_role">Data Custodian</p>
                            </div>
                            <div className="role_info">
                                <p className="usr">Jane Doe</p>
                                <p className="usr_role">ISO</p>
                            </div>
                            <div className="role_info">
                                <p className="usr">Mike Ross</p>
                                <p className="usr_role">DISO</p>
                            </div>
                            <div className="role_info">
                                <p className="usr">Rick Grimes</p>
                                <p className="usr_role">Employee</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Popup>
    );
};

export default ViewDataScope;
