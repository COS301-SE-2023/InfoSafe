import Popup from 'reactjs-popup';
import React from 'react';
import '../../styling/ViewDataScope.css';
import { IoArrowBackOutline } from 'react-icons/io5';
/* eslint-disable react/prop-types */

const ViewDataScope = ({ datascope, popupClose, popupOpen }) => {

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
                            <p className="viewDSRoles">Available Roles</p>
                            {/*{currentUsers && currentUsers.length > 0 ? (*/}
                            {/*    <Select*/}
                            {/*        options={currentUsers.map((email) => ({value: email, label: email}))}*/}
                            {/*        value={currentUsers.map((email) => ({value: email, label: email}))}*/}
                            {/*        placeholder={currentUsers[0]}*/}
                            {/*        className="editTaskAssignees"*/}
                            {/*        name="editTaskAssignees"*/}
                            {/*        styles={customStyles}*/}
                            {/*    /> ) : (*/}
                            {/*    <p>Loading...</p>*/}
                            {/*)}*/}
                            <p className="viewDSRoleDescription">Description</p>
                            <p className="viewDSCustodianLabel">Data Custodian</p>
                            <p className="viewDSCustodian">User 1234</p>
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
