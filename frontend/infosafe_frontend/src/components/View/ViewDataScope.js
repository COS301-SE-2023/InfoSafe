import Popup from 'reactjs-popup';
import React, {useEffect, useState} from 'react';
import '../../styling/ViewDataScope.css';
import { IoArrowBackOutline } from 'react-icons/io5';
import Select from "react-select";
import {customStyles} from "../CustomStyling";
/* eslint-disable react/prop-types */

const ViewDataScope = ({ datascope, popupClose, popupOpen }) => {
    const [dataScopeRoles, setDataScopeRoles] = useState([]);
    const [description, setDescription] = useState('');
    const [selectedDataScopeRole, setSelectedDataScopeRole] = useState(null);

    const handleDataScopeRoleChange = (selectedOption) => {
        setSelectedDataScopeRole(selectedOption);
        if (selectedOption) {
            setDescription(selectedOption.value);
        } else {
            setDescription('');
        }
    };

    useEffect(() => {
        fetch('http://infosafe.live/api/dataScopeRole/rolesByDataScopeId/' + datascope.data_scope_id, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + sessionStorage.getItem('accessToken')
            }
        })
            .then((res) => res.json())
            .then((result) => {
                setDataScopeRoles(result);
            });
    }, []);

    return (
        <Popup open={popupOpen} closeOnDocumentClick={false} position="center center">
            <div className="viewDataScopeOverlay">
                <div className="popupBackground">
                    <div className="borderDataScopeView">
                        <button className="viewDataScopeBackButton" onClick={popupClose} data-testid="back-button">
                            <IoArrowBackOutline className="viewDataScopeBackIcon" />
                        </button>
                        <p className="ViewDataScopeTitle">View Data Scope</p>
                        <div className="view_datascope_name">
                            <p className="datascopeName">Name</p>
                            <p className="viewDataScopeName">{datascope.ds_name}</p>
                        </div>
                        <div className="view_datascope_description">
                            <p className="datascopeDescription">Description</p>
                            <p className="viewDSDescription">{datascope.ds_description}</p>
                        </div>
                        <div className="view_datascope_date">
                            <p className="datascopeDate">Date Captured</p>
                            <p className="viewDataScopeDate">{datascope.date_captured}</p>
                        </div>
                        <div className="view_datascope_status">
                            <p className="datascopeStatus">Status</p>
                            <p className="viewDataScopeStatus">{datascope.ds_status}</p>
                        </div>
                        <div className="view_datascope_roles">
                            <p className="viewDSRoles">Assigned Users</p>
                            {datascope.users && datascope.users.length > 0 ? (
                                <Select
                                    options={datascope.users.map((data) => ({ value: data.first_name + ' ' + data.last_name, label: data.first_name + ' ' + data.last_name }))}
                                    placeholder={dataScopeRoles.label}
                                    className="editDSRoles"
                                    name="editTaskAssignees"
                                    styles={customStyles}
                                    defaultValue={datascope.users[0].first_name + ' ' + datascope.users[0].last_name}
                                    //onChange={handleDataScopeRoleChange}
                                />
                            ) : (
                                <p className="editDSRolesLoading">Loading...</p>
                            )}
                        </div>
                        <div className="view_datascope_roles">
                            <p className="viewDSRoles">Data Scope Roles</p>
                            {dataScopeRoles && dataScopeRoles.length > 0 ? (
                                <Select
                                    options={dataScopeRoles.map((data) => ({ value: data.role_description, label: data.role_type }))}
                                    placeholder={dataScopeRoles.label}
                                    className="editDSRoles"
                                    name="editTaskAssignees"
                                    styles={customStyles}
                                    value={selectedDataScopeRole}
                                    onChange={handleDataScopeRoleChange}
                                />
                            ) : (
                                <p className="editDSRolesLoading">Loading...</p>
                            )}
                            <p className="viewDSRoles">Role Description</p>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="editDSRoleDescription"
                            />
                            <p className="viewDSCustodianLabel">Data Custodian</p>
                            <p className="viewDSCustodian">{datascope.data_custodian.first_name} {datascope.data_custodian.last_name}</p>
                        </div>
                    </div>
                </div>

            </div>
        </Popup>
    );
};
// <div className="table">
//     <table className="viewRolesTable">
//         <thead>
//         <tr>
//             <th className="roleHeader">Role</th>
//             <th className="roledescrHeader">Role Description</th>
//         </tr>
//         </thead>
//         <tbody>
//         {ROLES.map((roles, key) => {
//             return (
//                 <tr key={key}>
//                     <td>{roles.role}</td>
//                     <td className="roledescriptionTable">
//                         {roles.roledescription}
//                     </td>
//                 </tr>
//             );
//         })}
//         </tbody>
//     </table>
// </div>
export default ViewDataScope;
