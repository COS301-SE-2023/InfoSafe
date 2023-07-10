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
    const current = new Date();
    const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;

    const[ds_name,setDsName]=useState('')
    const[description,setDsDesc]=useState('')
    const[role_name,setRoleName]=useState('General User')
    const[role_description,setRoleDesc]=useState('Can use basic functionality of the product')
    const[date_captured,setDateCaptured]=useState(date)
    const[data_custodian,setDataCustodian]=useState('LoggedIn User')
    const[administrator,setAdmin]=useState('Admin1')
    const[status,setStatus]=useState('Pending Approval')

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

    const handleClick=(e)=> {
        e.preventDefault()
        const datascope = {ds_name, description, role_name, role_description, date_captured, data_custodian, administrator, status}
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
                                    <input className="datascopeNameInput" value={ds_name} onChange={(e)=>setDsName(e.target.value)}/>
                                </div>
                                <div className="datascope_description">
                                    <p className="descriptionLabel">Description</p>
                                    <textarea className="descriptionInput" value={description} onChange={(e)=>setDsDesc(e.target.value)}/>
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
                        <button className="datascope_finish" onClick={handleClick}>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </Popup>
    );
};
