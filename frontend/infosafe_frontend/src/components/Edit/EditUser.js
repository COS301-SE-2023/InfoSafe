import Popup from 'reactjs-popup';
import React, {useEffect, useState} from 'react';
import '../../styling/EditUser.css';
import { IoArrowBackOutline } from 'react-icons/io5';
import Dropdown from 'react-dropdown';
/* eslint-disable react/prop-types */
/* eslint-disable  no-unused-vars */

const EditUser = ({ user, popupClose, popupOpen }) => {
    // const[first_name,setName]=useState({first_name: user.first_name})
    // const[last_name,setSurname]=useState({last_name: user.last_name})
    // const[email,setEmail]=useState({email: user.email})
    // const[password]=useState({password: user.password})
    // let [role,setRole]=useState({role: user.role})
    const[values, setValues]=useState({
        user_id: user.user_id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        password: user.password,
        role: user.role
    })

    //const values = [first_name, last_name, email, password, role];

    const ROLE_OPTIONS = [
        'EMPLOYEE',
        'ISO',
        'DISO',
        'DATA CUSTODIAN',
        'SYSTEM ADMINISTRATOR',
        'ASSET MANAGER'
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values)
        fetch('http://localhost:8080/api/user/update/' + user.user_id, {
            method:"PUT",
            headers:{"Content-Type":"application/json",
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            },
            body:JSON.stringify(values)
        }).then(()=>{
            console.log("Updated User")
        })
        //console.log(JSON.stringify(values))
        popupClose()
    }

    return (
        <Popup open={popupOpen} closeOnDocumentClick={false} position="center center" >
            <div className="editUserOverlay" data-testid="editUserPopup">
                <div className="border">
                    <button className="backButton" onClick={popupClose}>
                        <IoArrowBackOutline className="backIcon" />
                    </button>
                    <p className="editUserTitle">Edit User</p>
                    <form onSubmit={handleSubmit}>
                        <div className="nameEdit">
                            <p className="nameTitle">Name</p>
                            <input
                                className="editNameInput"
                                type="text"
                                id="editusername"
                                name="editusername"
                                data-testid="firstNameEdit"
                                defaultValue={user.first_name} onChange={e => setValues({...values, first_name: e.target.value})}
                            />
                        </div>
                        <div className="surnameEdit">
                            <p className="surnameTitle">Surname</p>
                            <input
                                className="editSurnameInput"
                                type="text"
                                id="editusersurname"
                                name="editusersurname"
                                defaultValue={user.last_name} onChange={e => setValues({...values, last_name: e.target.value})}
                            />
                        </div>
                        <div className="emailEdit">
                            <p className="emailTitle">Email</p>
                            <input
                                className="editEmailInput"
                                type="text"
                                id="edituseremail"
                                name="edituseremail"
                                defaultValue={user.email} onChange={e => setValues({...values, email: e.target.value})}
                            />
                        </div>
                        <div className="roleEdit">
                            <p className="roleTitle">System Role</p>
                            <Dropdown
                                options={ROLE_OPTIONS}
                                value={ROLE_OPTIONS[0]}
                                className="role_dropdown"
                                data-testid="role_dropdown"
                                name="role"
                                defaultValue={user.role}  onChange={(selectedOption) => setValues({ ...values, role: selectedOption.value })}
                                //onChange={(selectedOption) => setRole(selectedOption.value)}
                            />
                        </div>
                        <button className="FinishButton" data-testid="finish">
                            Finish
                        </button>
                    </form>
                </div>
            </div>
        </Popup>
    );
};

export default EditUser;
