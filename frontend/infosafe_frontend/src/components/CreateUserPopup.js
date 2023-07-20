import React, {useEffect, useState} from 'react';
import Dropdown from 'react-dropdown';
import '../styling/CreateUserPopup.css';
import Popup from 'reactjs-popup';
import { IoArrowBackOutline } from 'react-icons/io5';

/* eslint-disable react/prop-types */
const ROLE_OPTIONS = [
    'EMPLOYEE',
    'ISO',
    'DISO',
    'DATA CUSTODIAN',
    'SYSTEM ADMINISTRATOR',
    'ASSET MANAGER'
];
export const CreateUserPopup = ({ popupOpen, popupClose }) => {
    const[first_name,setName]=useState('')
    const[last_name,setSurname]=useState('')
    const[email,setEmail]=useState('')
    let [system_role_id,setRole]=useState('')
    const[password,setPassword]=useState('')

    const handleClick=(e)=> {
        e.preventDefault()

        const user = {first_name, last_name, email, password, system_role_id}
        console.log(user)
        fetch("http://localhost:8080/api/auth/add", {
            method:"POST",
            headers:{"Content-Type":"application/json",
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            },
            body:JSON.stringify(user)
        }).then(()=>{
            console.log("New User added")
        })
        popupClose()
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/auth/generate", {
                    headers: {
                        Authorization: sessionStorage.getItem('accessToken')
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    const randomP = data.password.toString();
                    setPassword(randomP);
                } else {
                    console.error('Error fetching string from the server.');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);

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
                        <input className="nameInput" data-testid="nameInput" name="name" value={first_name} onChange={(e)=>setName(e.target.value)}/>
                        <p className="surnameLabel">Surname</p>
                        <input className="surnameInput" data-testid="surnameInput" name="surname" value={last_name} onChange={(e)=>setSurname(e.target.value)}/>
                        <p className="emailLabel">Email</p>
                        <input className="emailInput" data-testid="emailInput" name="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        <p className="passwordLabel">Password</p>
                        <input className="passwordInput" data-testid="passwordInput" name="password" placeholder={password}/>
                        <p className="roleLabel">System Role</p>
                        <Dropdown
                            options={ROLE_OPTIONS}
                            value={ROLE_OPTIONS[0]}
                            className="role_dropdown"
                            data-testid="role_dropdown"
                            name="systemRole"
                            onChange={(selectedOption) => setRole(selectedOption.value)}
                        />
                        <button className="createuser_finish" data-testid="createuser_finish"  onClick={handleClick}>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </Popup>
    );
};
