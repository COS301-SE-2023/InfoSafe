import React, { useState } from 'react';
import '../styling/CreateDataScopePopup.css';
import Popup from 'reactjs-popup';
import { IoArrowBackOutline } from 'react-icons/io5';

const data = [
    {
        systemRole: 'Administrator',
        roledescription: 'Manage users, manage data scope, edit permissions.'
    },
    {
        systemRole: 'General User',
        roledescription: 'Access data scope, complete tasks within data scopes.'
    }
];

export const CreateDataScopePopup = ({ popupOpen, popupClose }) => {
    const [roles, setRoles] = useState(data);
    const [newRole, setNewRole] = useState({ systemRole: '', roledescription: '' });
    const current = new Date();
    const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;

    const[ds_name,setDs_name]=useState('')
    const[ds_description,setDs_description]=useState('')
    const[date_captured]=useState(date)
    const[ds_status]=useState('Pending Approval')

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRole((prevRole) => ({ ...prevRole, [name]: value }));
    };

    const handleAddRole = (e) => {
        e.preventDefault();
        if (newRole.systemRole && newRole.roledescription) {
            setRoles((prevRoles) => [...prevRoles, newRole]);
            setNewRole({ systemRole: '', roledescription: '' });
        }
    };

    const handleClick=(e)=> {
        e.preventDefault()
        const datascope = {ds_name, ds_description, date_captured, ds_status}
        console.log(datascope)
        fetch("http://localhost:8080/api/datascope/addDs", {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(datascope)
        }).then(()=>{
            console.log("New DataScope added")
        })
        popupClose()
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
                                    <input className="datascopeNameInput" value={ds_name} onChange={(e)=>setDs_name(e.target.value)}/>
                                </div>
                                <div className="datascope_description">
                                    <p className="descriptionLabel">Description</p>
                                    <textarea className="descriptionInput" value={ds_description} onChange={(e)=>setDs_description(e.target.value)}/>
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
                                                {roles.map((systemRole, key) => {
                                                    return (
                                                        <tr key={key}>
                                                            <td>{systemRole.systemRole}</td>
                                                            <td className="roledescription_Table">
                                                                {systemRole.roledescription}
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
                                    name="systemRole"
                                    value={newRole.systemRole}
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
                        <button className="datascope_finish" onClick={handleClick}>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </Popup>
    );
};
