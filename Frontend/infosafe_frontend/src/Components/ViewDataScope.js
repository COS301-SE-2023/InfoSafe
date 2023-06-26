import Popup from 'reactjs-popup';
import React from 'react';
import '../Styling/ViewDataScope.css';
import { IoArrowBackOutline } from 'react-icons/io5';
/* eslint-disable react/prop-types */

const ViewDataScope = ({ datascope, popupClose, popupOpen }) => {
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
                        <p className="viewDataScopeName">{datascope.dsName}</p>
                    </div>
                    <div className="view_datascope_description">
                        <p className="datascopeDescription">Description</p>
                        <p className="viewDSDescription">{datascope.description}</p>
                    </div>
                    <div className="view_datascope_date">
                        <p className="datascopeDate">Date Captured</p>
                        <p className="viewDataScopeDate">{datascope.dateCaptured}</p>
                    </div>
                    <div className="view_datascope_status">
                        <p className="datascopeStatus">Status</p>
                        <p className="viewDataScopeStatus">{datascope.status}</p>
                    </div>
                    <div className="view_datascope_roles">
                        <p className="datascopeRoles">Roles</p>
                        <div className="roleView">
                            <div className="headers">
                                <p className="header_1">Role</p>
                                <p className="header_2">Role Description</p>
                            </div>
                            <div className="role_info">
                                <p className="role_name">Administrator</p>
                                <p className="role_descr">Manage users, manage data scope, edit permissions.</p>
                            </div>
                            <div className="role_info">
                                <p className="role_name">General User</p>
                                <p className="role_name">Access data scope, complete tasks within data scopes.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Popup>
    );
};

export default ViewDataScope;
