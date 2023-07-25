import Popup from 'reactjs-popup';
import React from 'react';
import '../styling/ViewDataScope.css';
import { IoArrowBackOutline } from 'react-icons/io5';
/* eslint-disable react/prop-types */

const ViewDataScope = ({ datascope, popupClose, popupOpen }) => {
    const ROLES = [
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
                        <p className="viewDataScopeName">{/*{datascope.ds_name}*/}Data Scope 1</p>
                    </div>
                    <div className="view_datascope_description">
                        <p className="datascopeDescription">Description</p>
                        <p className="viewDSDescription">{datascope.description}</p>
                    </div>
                    <div className="view_datascope_date">
                        <p className="datascopeDate">Date Captured</p>
                        <p className="viewDataScopeDate">{/*{datascope.date_captured}*/}2023-07-01</p>
                    </div>
                    <div className="view_datascope_status">
                        <p className="datascopeStatus">Status</p>
                        <p className="viewDataScopeStatus">{datascope.status}</p>
                    </div>
                    <div className="view_datascope_roles">
                        <p className="datascopeRoles">Roles</p>
                        <div className="table">
                            <table className="viewRolesTable">
                                <thead>
                                    <tr>
                                        <th className="roleHeader">Role</th>
                                        <th className="roledescrHeader">Role Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ROLES.map((roles, key) => {
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
