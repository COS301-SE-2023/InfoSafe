import React, { useState } from 'react';
import '../Styling/CreateUserPopup.css';
import Popup from 'reactjs-popup';
import { IoArrowBackOutline } from 'react-icons/io5';

/* eslint-disable react/prop-types */


export const CreateUserPopup = ({ popupOpen, popupClose }) => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('ISO');
    const [password, setPassword] = useState('');

    const handleClick = (e) => {
        e.preventDefault();
        const user = { name, surname, email, password, role };
        console.log(user);
        fetch('http://localhost:8080/user/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        }).then(() => {
            console.log('New User added');
        });
        popupClose();
    };

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
            <div className="createUserOverlay">
                <div className="createuserBorder">
                    <form>
                        <button className="backButton" onClick={popupClose}>
                            <IoArrowBackOutline className="backIcon" />
                        </button>
                        <p className="createuserLabel">User Creation</p>
                        <p className="nameLabel">Name</p>
                        <input
                            className="nameInput"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <p className="surnameLabel">Surname</p>
                        <input
                            className="surnameInput"
                            name="surname"
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                        />
                        <p className="emailLabel">Email</p>
                        <input
                            className="emailInput"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <p className="passwordLabel">Password</p>
                        <input
                            className="passwordInput"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button className="genPassword">Generate Password</button>
                        <p className="roleLabel">System role</p>
                        <select
                            className="role_dropdown"
                            name="role"
                        >
                            {makeOptions()}
                        </select>
                        <br/>
                        <button className="createuser_finish" onClick={handleClick}>
                            Submit
                        </button>
                    </form>
                    {/*{name}*/}
                    {/*{surname}*/}
                    {/*{email}*/}
                    {/*{password}*/}
                    {/*{role}*/}
                </div>
            </div>
        </Popup>
    );
};
