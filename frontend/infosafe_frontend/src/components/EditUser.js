import Popup from 'reactjs-popup';
import React from 'react';
import '../styling/EditUser.css';
import { IoArrowBackOutline } from 'react-icons/io5';
/* eslint-disable react/prop-types */
const EditUser = ({ user, popupClose, popupOpen }) => {
    const makeOptions = () => {
        var options = [];
        const ROLE_OPTIONS = [
            'EMPLOYEE',
            'ISO',
            'DISO',
            'DATA CUSTODIAN',
            'SYSTEM ADMINISTRATOR',
            'ASSET MANAGER'
        ];
        ROLE_OPTIONS.map((opt) => options.push(<option>{opt}</option>));
        return options;
    };

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
                                defaultValue={user.firstname}
                            />
                        </div>
                        <div className="surnameEdit">
                            <p className="surnameTitle">Surname</p>
                            <input
                                className="editSurnameInput"
                                type="text"
                                id="editusersurname"
                                name="editusersurname"
                                defaultValue={user.lastname}
                            />
                        </div>
                        <div className="emailEdit">
                            <p className="emailTitle">Email</p>
                            <input
                                className="editEmailInput"
                                type="text"
                                id="edituseremail"
                                name="edituseremail"
                                defaultValue={user.email}
                            />
                        </div>
                        <div className="roleEdit">
                            <p className="roleTitle">System Role</p>
                            <select className="roleDropdown" name="role">
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
