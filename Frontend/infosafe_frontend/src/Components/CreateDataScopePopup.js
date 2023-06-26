import React, { useState } from 'react';
import '../Styling/CreateDataScopePopup.css';
import Popup from 'reactjs-popup';
import { IoArrowBackOutline } from 'react-icons/io5';

const data = [
    {
        role: 'Administrator',
        roledescription: 'Manage users, manage data scope, edit permissions.'
    },
    {
        role: 'General User',
        roledescription: 'Access data scope, complete tasks within data scopes.'
    }
];

export const CreateDataScopePopup = ({ popupOpen, popupClose }) => {
    const [roles, setRoles] = useState(data);
    const [newRole, setNewRole] = useState({ role: '', roledescription: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRole((prevRole) => ({ ...prevRole, [name]: value }));
    };

    const handleAddRole = (e) => {
        e.preventDefault();
        if (newRole.role && newRole.roledescription) {
            setRoles((prevRoles) => [...prevRoles, newRole]);
            setNewRole({ role: '', roledescription: '' });
        }
    };

    return (
        <Popup open={popupOpen} closeOnDocumentClick={false} position="center center">
            <div className="createDataScopeOverlay">
                <div className="createdatascopeBorder">
                    <button className="backButton" onClick={popupClose}>
                        <IoArrowBackOutline className="backIcon" />
                    </button>
                    <p className="datascopeLabel">Data Scope Creation</p>
                    <form>
                        <div className="CreateDataScopeForm">
                            <div className="datascope_info">
                                <div className="datascope_name">
                                    <p className="datascopeNameLabel">Name</p>
                                    <input className="datascopeNameInput" />
                                </div>
                                <div className="datascope_description">
                                    <p className="descriptionLabel">Description</p>
                                    <textarea className="descriptionInput" />
                                </div>
                                <div className="datascope_roles">
                                    <p className="roleLabel">Data Scope Roles</p>
                                    <div className="table">
                                        <table className="roles_tbl">
                                            <thead>
                                                <tr>
                                                    <th className="role_Header">Role</th>
                                                    <th className="role_descrHeader">
                                                        Role Description
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {roles.map((role, key) => {
                                                    return (
                                                        <tr key={key}>
                                                            <td>{role.role}</td>
                                                            <td className="roledescription_Table">
                                                                {role.roledescription}
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <div className="datascope_addrole">
                                <p className="addrolenameLabel">Role</p>
                                <input
                                    className="addrolenameInput"
                                    name="role"
                                    value={newRole.role}
                                    onChange={handleInputChange}
                                />
                                <p className="addroledescriptionLabel">Role Description</p>
                                <textarea
                                    className="addroledescriptionInput"
                                    name="roledescription"
                                    value={newRole.roledescription}
                                    onChange={handleInputChange}
                                />
                                <button
                                    className="AddRoleButton"
                                    onClick={handleAddRole}
                                    type="button"
                                >
                                    Add Role
                                </button>
                            </div>
                        </div>
                        <button className="datascope_finish" onClick={popupClose}>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </Popup>
    );
};
