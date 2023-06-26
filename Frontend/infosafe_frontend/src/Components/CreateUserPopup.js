import React, {useState} from 'react';
import Dropdown from 'react-dropdown';
import '../Styling/CreateUserPopup.css';
import Popup from 'reactjs-popup';
import { IoArrowBackOutline } from 'react-icons/io5';

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
    const[firstname,setName]=useState('')
    const[lastname,setSurname]=useState('')
    const[email,setEmail]=useState('')
    let [role,setRole]=useState('')
    const[password,setPassword]=useState('')

    const handleClick=(e)=> {
        e.preventDefault()

        const user = {firstname, lastname, email, password, role}
        console.log(user)
        fetch("http://localhost:8080/api/auth/add", {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(user)
        }).then(()=>{
            console.log("New User added")
        })
        popupClose()
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
                        <input className="nameInput" name="name" value={firstname} onChange={(e)=>setName(e.target.value)}/>
                        <p className="surnameLabel">Surname</p>
                        <input className="surnameInput" name="surname" value={lastname} onChange={(e)=>setSurname(e.target.value)}/>
                        <p className="emailLabel">Email</p>
                        <input className="emailInput" name="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        <p className="passwordLabel">Password</p>
                        <input className="passwordInput" name="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                        <button className="genPassword">Generate Password</button>
                        <p className="roleLabel">System role</p>
                        <Dropdown
                            options={role_options}
                            value={role_options[0]}
                            className="role_dropdown"
                            name="role"
                            onChange={(selectedOption) => setRole(selectedOption.value)}
                        />
                        <button className="createuser_finish" onClick={handleClick}>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </Popup>
    );
};
