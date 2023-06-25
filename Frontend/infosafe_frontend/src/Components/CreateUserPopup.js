import React from 'react';
import Dropdown from 'react-dropdown';
import '../Styling/CreateUserPopup.css';
import Popup from 'reactjs-popup';

/* eslint-disable react/prop-types */
const role_options = [
    'EMPLOYEE',
    'ISO',
    'DISO',
    'DATA CUSTODIAN',
    'SYSTEM ADMINISTRATOR',
    'ASSET MANAGER'
];
export const CreateUserPopup = ({ popupOpen, popupClose }) => {
    return (
        <Popup open={popupOpen} closeOnDocumentClick={false} position="center center">
            <div className="createUserOverlay">
                <div className="createuserBorder">
                    <form>
                        <p className="createuserLabel">User Creation</p>
                        <p className="nameLabel">Name</p>
                        <input className="nameInput" name="name" />
                        <p className="surnameLabel">Surname</p>
                        <input className="surnameInput" name="surname" />
                        <p className="emailLabel">Email</p>
                        <input className="emailInput" name="email" />
                        <p className="passwordLabel">Password</p>
                        <input className="passwordInput" name="password" />
                        <button className="genPassword">Generate Password</button>
                        <p className="roleLabel">System role</p>
                        <Dropdown
                            options={role_options}
                            value={role_options[0]}
                            className="role_dropdown"
                            name="role"
                        />
                        <button className="createuser_finish" onClick={popupClose}>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </Popup>
    );
};
