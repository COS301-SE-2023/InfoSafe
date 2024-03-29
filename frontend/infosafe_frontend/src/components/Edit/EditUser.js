import Popup from 'reactjs-popup';
import React, {useEffect, useState} from 'react';
import { IoArrowBackOutline } from 'react-icons/io5';
import Dropdown from 'react-dropdown';
import {customStyles} from "../CustomStyling";
import '../../styling/EditUser.css'

const EditUser = ({ user, popupClose, popupOpen , onUserEdited}) => {
    const [selectedRole, setSelectedRole] = useState(user.role.role_name)
    const [roleNames, setRoleNames] = useState('')
    const [values, setValues] = useState({
        user_id: user.user_id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        password: user.password,
        role: {role_name: selectedRole}
    });

    // const handleRole = (selectedOptions) => {
    //     console.log(selectedOptions)
    //     setSelectedRole(selectedOptions);
    //     console.log(selectedOptions)
    // };

    useEffect(() => {
        //console.log("this happened")
        if (user) {
            setValues({
                user_id: user.user_id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                password: user.password,
                role: {role_name: user.role.role_name}
            });
        }
    }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values)
        fetch('https://infosafe.live/api/user/update/' + user.user_id, {
            method:"PUT",
            headers:{"Content-Type":"application/json",
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            },
            body:JSON.stringify(values)
        }).then(()=>{
            console.log("Updated User");
            onUserEdited();
        })
        popupClose()
    }

    useEffect(() => {
        async function fetchRoles() {
            const response = await fetch("https://infosafe.live/api/role/getRoleNames", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + sessionStorage.getItem('accessToken')
                },
            });
            const roles = await response.json();
            setRoleNames(roles);
        }
        fetchRoles();
    }, []);

    return (
        <Popup open={popupOpen} closeOnDocumentClick={false} position="center center" >
            <div className="editUserOverlay" data-testid="editUserPopup">
                <div className="popupBackground">
                    <div className="editUserBorder">
                        <button className="editUserBackButton" onClick={popupClose} data-testid="back-button">
                            <IoArrowBackOutline className="editUserBackIcon" />
                        </button>
                        <p className="editUserTitle">Edit User</p>
                        <div className="editUserContent">
                            <form onSubmit={handleSubmit}>
                                <div className="nameEdit">
                                    <p className="nameTitle">Name</p>
                                    <input
                                        className="editNameInput"
                                        type="text"
                                        id="editusername"
                                        name="editusername"
                                        data-testid="firstNameEdit"
                                        defaultValue={user.first_name}
                                        onChange={e => setValues({...values, first_name: e.target.value})}
                                    />
                                </div>
                                <div className="surnameEdit">
                                    <p className="surnameTitle">Surname</p>
                                    <input
                                        className="editSurnameInput"
                                        type="text"
                                        id="editusersurname"
                                        name="editusersurname"
                                        defaultValue={user.last_name}
                                        onChange={e => setValues({...values, last_name: e.target.value})}
                                    />
                                </div>
                                <div className="emailEdit">
                                    <p className="editUserEmailTitle">Email</p>
                                    <input
                                        className="editUserEmailInput"
                                        type="text"
                                        id="edituseremail"
                                        name="edituseremail"
                                        defaultValue={user.email}
                                        onChange={e => setValues({...values, email: e.target.value})}
                                        readOnly={true}
                                    />
                                </div>
                                {user.role.role_name !== "ADMIN" ? (
                                <div className="roleEdit">
                                    <p className="roleTitle">System Role</p>
                                    {roleNames && roleNames.length > 0 ? (
                                        <Dropdown
                                            options={roleNames.map(roleName => ({ label: roleName, value: roleName }))}
                                            value={selectedRole}
                                            className="roleDropdown"
                                            name="roleDropdown"
                                            onChange={roleNames => setValues({...values, role: {role_name: roleNames.value}})}
                                        />
                                    ) : (
                                        <p className="editUserRolesLoading">Loading...</p>
                                    )}
                                </div>
                                    ) : null}
                                <button className="editUserFinishButton" data-testid="finish">
                                    Finish
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Popup>
    );
};

export default EditUser;
