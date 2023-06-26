import Popup from 'reactjs-popup';
import React from 'react';
import '../Styling/EditUser.css';
import Dropdown from 'react-dropdown';
import { IoArrowBackOutline } from 'react-icons/io5';
/* eslint-disable react/prop-types */
const EditUser = ({ id, popupClose, popupOpen }) => {

    const makeOptions = () =>{
        var options = []
        const role_options = [
            'EMPLOYEE',
            'ISO',
            'DISO',
            'DATA CUSTODIAN',
            'SYSTEM ADMINISTRATOR',
            'ASSET MANAGER'
        ];
        role_options.map(opt => options.push(<option>{opt}</option>));
        return(options);
    }

    return (
        <Popup open={popupOpen} closeOnDocumentClick={false} position="center center">
            <div className="editUserOverlay">
                <div className="border">
                    <button className="backButton" onClick={popupClose}>
                        <IoArrowBackOutline className="backIcon" />
                    </button>
                    <p className="editUserTitle">Edit User</p>
                    <form>
                        <div className="nameEdit">
                            <p className="nameTitle">Name</p>
                            <input
                                className="editNameInput"
                                type="text"
                                id="editusername"
                                name="editusername"
                                defaultValue="Jane"
                            />
                        </div>
                        <div className="surnameEdit">
                            <p className="surnameTitle">Surname</p>
                            <input
                                className="editSurnameInput"
                                type="text"
                                id="editusersurname"
                                name="editusersurname"
                                defaultValue="Doe"
                            />
                        </div>
                        <div className="emailEdit">
                            <p className="emailTitle">Email</p>
                            <input
                                className="editEmailInput"
                                type="text"
                                id="edituseremail"
                                name="edituseremail"
                                defaultValue="jane.doe@example.com"
                            />
                        </div>
                        <div className="newPassword">
                            <p className="newPasswordTitle">New Password</p>
                            <input
                                className="newPasswordInput"
                                type="password"
                                id="newpassword"
                                name="newpassword"
                            />
                        </div>
                        <div className="confirmPassword">
                            <p className="confirmPasswordTitle">Confirm Password</p>
                            <input
                                className="confirmPasswordInput"
                                type="password"
                                id="confirmpassword"
                                name="confirmpassword"
                            />
                        </div>
                        <div className="roleEdit">
                            <p className="roleTitle">System Role</p>
                            <select
                                className="roleDropdown"
                                name="role"
                            >
                                {makeOptions()}
                            </select>
                        </div>
                        <button className="FinishButton" onClick={popupClose}>
                            Finish
                        </button>
                    </form>
                </div>
            </div>
        </Popup>
    );
};

export default EditUser;
