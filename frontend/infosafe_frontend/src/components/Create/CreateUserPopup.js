import React, {useEffect, useState} from 'react';
import Dropdown from 'react-dropdown';
import '../../styling/CreateUserPopup.css';
import Popup from 'reactjs-popup';
import { IoArrowBackOutline } from 'react-icons/io5';

const ROLE_OPTIONS = [
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

    const handleClick = (e) => {
        e.preventDefault();
        const selectedRole = role === '' ? 'EMPLOYEE' : role;
        const user = { firstname, lastname, email, password, role: selectedRole };

        fetch(`http://localhost:8080/api/user/checkEmail?email=${email}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + sessionStorage.getItem('accessToken'),
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data) {
                    console.log("User already exists");
                } else {
                    console.log(user);
                    fetch("http://localhost:8080/api/user/add", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + sessionStorage.getItem('accessToken'),
                        },
                        body: JSON.stringify(user),
                    })
                        .then(() => {
                            console.log("New User added");
                        })
                        .catch((error) => {
                            console.error("Error adding new user:", error);
                        });
                    popupClose();
                }
            })
            .catch((error) => {
                console.error("Error checking email:", error);
            });
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/randPass/generate", {
                    method: "GET",
                    headers: {"Content-Type":"application/json",
                        Authorization: "Bearer " + sessionStorage.getItem('accessToken')
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
                <div className="createUserBorder">
                    <form>
                        <button className="backButton" onClick={popupClose}>
                            <IoArrowBackOutline className="backIcon" />
                        </button>
                        <p className="createUserLabel">User Creation</p>
                        <p className="nameLabel">Name</p>
                        <input className="nameInput" data-testid="nameInput" name="name" value={firstname} onChange={(e)=>setName(e.target.value)}/>
                        <p className="surnameLabel">Surname</p>
                        <input className="surnameInput" data-testid="surnameInput" name="surname" value={lastname} onChange={(e)=>setSurname(e.target.value)}/>
                        <p className="emailLabel">Email</p>
                        <input className="emailInput" data-testid="emailInput" name="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        <p className="passwordLabel">Password</p>
                        <input className="passwordInput" data-testid="passwordInput" name="password" placeholder={password} readOnly/>
                        <p className="roleLabel">System role</p>
                        <Dropdown
                            options={ROLE_OPTIONS}
                            value={ROLE_OPTIONS[0]}
                            className="role_dropdown"
                            data-testid="role_dropdown"
                            name="role"
                            onChange={(selectedOption) => setRole(selectedOption.value)}
                        />
                        <button className="createUserFinish" data-testid="createuser_finish"  onClick={handleClick}>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </Popup>
    );
};
