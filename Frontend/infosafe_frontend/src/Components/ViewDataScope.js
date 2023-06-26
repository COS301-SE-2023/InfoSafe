import Popup from 'reactjs-popup';
import React from 'react';
import '../Styling/ViewDataScope.css';
import { FaRegEdit } from 'react-icons/fa';
import { IoArrowBackOutline } from 'react-icons/io5';
/* eslint-disable react/prop-types */

const ViewDataScope = ({ id, popupClose, popupOpen }) => {
    const roles = [
        {
            role: 'Administrator',
            roledescription: 'Manage users, manage data scope, edit permissions.'
        },
        {
            role: 'General User',
            roledescription: 'Access data scope, complete tasks within data scopes.'
        }
    ];

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
                        <div className="table">
                            <table className="rolesTable">
                                <thead>
                                    <tr>
                                        <th className="roleHeader">Role</th>
                                        <th className="roledescrHeader">Role Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {roles.map((roles, key) => {
                                        return (
                                            <tr key={key}>
                                                <td>{roles.role}</td>
                                                <td className="roledescriptionTable">
                                                    {roles.roledescription}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Popup>
    );
};

export default ViewDataScope;
