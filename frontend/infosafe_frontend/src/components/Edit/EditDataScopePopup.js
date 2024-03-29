import React, { useEffect, useState } from 'react';
import '../../styling/EditDataScopePopup.css';
import Popup from 'reactjs-popup';
import { IoArrowBackOutline } from 'react-icons/io5';
import Dropdown from 'react-dropdown';
import ViewDataScope from "../View/ViewDataScope";
import Select from "react-select";
import {customStyles} from "../CustomStyling";
const STATUS = ['Pending', 'Approved', 'Revoked'];

export const EditDataScopePopup = ({ datascope, popupOpen, popupClose, onDsEdited }) => {
    const [newRole, setNewRole] = useState({ role: '', roledescription: '' });
    const [dataScopeRoles, setDataScopeRoles] = useState([]);
    const [selectedDataScopeRole, setSelectedDataScopeRole] = useState(null);
    const [description, setDescription] = useState('');
    //const [users, setUsers] = useState([]);
    const [values, setValues] = useState({
        data_scope_id: datascope.data_scope_id,
        data_custodian: datascope.dataCustodian.user_id,
        date_captured: datascope.date_captured,
        ds_description: datascope.ds_description,
        ds_name: datascope.ds_name,
        ds_status: datascope.ds_status
    });

    // useEffect(() => {
    //     fetch("https://infosafe.live/api/user/findUsersNotInTask/" + task.task_id, {
    //         method: "GET",
    //         headers: {
    //             Authorization: "Bearer " + sessionStorage.getItem('accessToken')
    //         }
    //     })
    //         .then((res) => res.json())
    //         .then((result) => {
    //             setUsers(result);
    //         });
    // }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRole((prevRole) => ({ ...prevRole, [name]: value }));
    };
    const handleDataScopeRoleChange = (selectedOption) => {
        setSelectedDataScopeRole(selectedOption);
        if (selectedOption) {
            setDescription(selectedOption.value);
        } else {
            setDescription('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(datascope);
        //console.log(values);

        fetch('https://infosafe.live/api/datascope/update/' + datascope.data_scope_id, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                Authorization: 'Bearer ' + sessionStorage.getItem('accessToken')
            },
            body: JSON.stringify(values)
        }).then(() => {
            console.log('Updated Datascope');
            onDsEdited()
        });
        popupClose();
    };

    useEffect(() => {
        fetch('https://infosafe.live/api/dataScopeRole/rolesByDataScopeId/' + datascope.data_scope_id, {
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

    const handleAddRole = (e) => {
        e.preventDefault();
        const newRoleData = { datascope: datascope.data_scope_id, role_description: newRole.roledescription, role_type: newRole.role };

        fetch('https://infosafe.live/api/dataScopeRole/addDataScopeRole', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + sessionStorage.getItem('accessToken')
            },
            body: JSON.stringify(newRoleData)
        })
            .then(() => {
                console.log('New DataScopeRole added');
                setDataScopeRoles([...dataScopeRoles, newRoleData]);
                setNewRole({ role: '', roledescription: '' });
            })
            .catch((error) => {
                console.error('Error adding new DataScopeRole:', error);
            });
    };

    return (
        <Popup open={popupOpen} closeOnDocumentClick={false} position="center center">
            <div className="editDataScopeOverlay">
                <div className="popupBackground">
                    <div className="editdatascopeBorder">
                        <form onSubmit={handleSubmit}>
                            <button className="editDataScopeBackButton" onClick={popupClose} data-testid="back-button">
                                <IoArrowBackOutline className="backIcon" />
                            </button>
                            <p className="editDatascopeLabel">Edit Data Scope</p>
                            <div className="editDataScopeContent">
                                <p className="editDatasscopeNameLabel">Name</p>
                                <input
                                    className="editDatascopeNameInput"
                                    defaultValue={datascope.ds_name}
                                    onChange={(e) => setValues({ ...values, ds_name: e.target.value })}
                                />
                                <p className="editDescriptionLabel">Description</p>
                                <textarea
                                    className="editDescriptionInput"
                                    defaultValue={datascope.ds_description}
                                    onChange={(e) => setValues({ ...values, ds_description: e.target.value })}
                                />
                                <br />
                                <p className="editStatusLabel">Status</p>
                                <Dropdown
                                    options={STATUS}
                                    value={datascope.ds_status}
                                    className="editDSStatusDropdown"
                                    data-testid="editDSStatusDropdown"
                                    defaultValue={datascope.status}
                                    onChange={(selectedOption) => setValues({ ...values, ds_status: selectedOption.value })}
                                />
                                {/*<p className="editDSUsers">Assigned Users</p>*/}
                                {/*{users && users.length > 0 ? (*/}
                                {/*    <Select*/}
                                {/*        options={users.map((data) => ({value: data.user_id, label: data.email}))}*/}
                                {/*        value={selectedUsers.map((email) => ({ label: email }))}*/}
                                {/*        className="editTaskAssignees"*/}
                                {/*        name="editTaskAssignees"*/}
                                {/*        placeholder={"Add Assignees"}*/}
                                {/*        onChange={handleSelect}*/}
                                {/*        isSearchable={true}*/}
                                {/*        styles={customStyles}*/}
                                {/*        isMulti*/}
                                {/*    /> ) : (*/}
                                {/*    <p>Loading...</p>*/}
                                {/*)}*/}
                                <p className="editDSRoleLabel">Data Scope Roles</p>
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
                                <p className="editDSRoleLabel">Role Description</p>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="editDSRoleDescription"
                                />
                                <p className="AddRoleNameHeading">Add New Roles:</p>
                                <p className="AddRoleNameLabel">Role Type</p>
                                <input
                                    className="AddRoleNameInput"
                                    data-testid="addRole"
                                    name="role"
                                    value={newRole.role}
                                    onChange={handleInputChange}
                                />
                                <p className="AddRoleDescriptionLabel">Role Description</p>
                                <textarea
                                    className="AddRoleDescriptionInput"
                                    data-testid="addRoleDescription"
                                    name="roledescription"
                                    value={newRole.roledescription}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="editDataScopeButtonsDiv">
                                <button
                                    className="AddRoleButton"
                                    data-testid="addRoleButton"
                                    onClick={handleAddRole}
                                    type="button"
                                >
                                    Add Role
                                </button>
                                <button className="editdatascope_finish">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Popup>
    );
};

export default EditDataScopePopup;
