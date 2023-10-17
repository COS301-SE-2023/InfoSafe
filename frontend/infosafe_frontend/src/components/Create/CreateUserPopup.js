import React, {useEffect, useState} from 'react';
import Dropdown from 'react-dropdown';
import '../../styling/CreateUserPopup.css';
import '../../styling/Dropdown.css'
import Popup from 'reactjs-popup';
import {IoArrowBackOutline} from 'react-icons/io5';


export const CreateUserPopup = ({popupOpen, popupClose, onUserAdded}) => {
    const [first_name, setName] = useState('')
    const [last_name, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [roleNames, setRoleNames] = useState('')
    const [selectedRole, setSelectedRole] = useState('');
    const emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
    const [errMsg, setErrMsg] = useState("");
    const useHandleClick = (e) => {
        e.preventDefault();


        if (document.getElementById("nameInput").value === '' || document.getElementById("surnameInput").value === '' || document.getElementById("emailInput").value === '' || selectedRole === '') {
            setErrMsg("Please ensure that all fields are completed.");
            return;
        } else if (!emailRegex.test(email)) {
            setErrMsg("Invalid email format");
            return;
        }

        popupClose();
        const user = {first_name, last_name, email, password, role: {role_name: selectedRole}};

        console.log(user);
        fetch("https://infosafe.live/api/user/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + sessionStorage.getItem('accessToken'),
            },
            body: JSON.stringify(user),
        })
            .then((response) => {
                if (response.ok) {
                    console.log("New User added");
                    onUserAdded();
                }
            })
            .catch((error) => {
                console.error("Error adding new user:", error);
            });
    };


useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch("https://infosafe.live/api/randPass/generate", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
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

useEffect(() => {
    fetch("https://infosafe.live/api/role/getRoleNames", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + sessionStorage.getItem('accessToken')
        },
    }).then((res) => res.json())
        .then((result) => {
            setRoleNames(result);
        });
}, [])

return (
    <Popup open={popupOpen} closeOnDocumentClick={false} position="center center">
        <div className="createUserOverlay">
            <div className="popupBackground">
                <div className="createUserBorder">
                    <form>
                        <button className="createUserBackButton" onClick={popupClose} data-testid={"back-button"}>
                            <IoArrowBackOutline className="backIcon"/>
                        </button>
                        <p className="createUserLabel">Create User</p>
                        <div className="createUserContent">
                            <div className="createUserName">
                                <p className="nameLabel">Name</p>
                                <input required className="nameInput" id="nameInput" data-testid="nameInput" name="name"
                                       value={first_name} onChange={(e) => setName(e.target.value)}/>
                            </div>
                            <div className="createUserSurname">
                                <p className="surnameLabel">Surname</p>
                                <input required className="surnameInput" id="surnameInput" data-testid="surnameInput"
                                       name="surname" value={last_name} onChange={(e) => setSurname(e.target.value)}/>
                            </div>
                            <div className="createUserEmail">
                                <p className="emailLabel">Email</p>
                                <input required className="emailInput" id="emailInput" data-testid="emailInput"
                                       name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                            </div>
                            <div className="createUserPassword">
                                <p className="passwordLabel">Password</p>
                                <input required className="passwordInput" id="passwordInput" data-testid="passwordInput"
                                       name="password" placeholder={password} readOnly/>
                            </div>
                            <p className="createUserRoleLabel">System Role</p>
                            {roleNames && roleNames.length > 0 ? (
                                <Dropdown
                                    options={roleNames.map(roleName => ({label: roleName, value: roleName}))}
                                    values={selectedRole ? [{label: selectedRole, value: selectedRole}] : []}
                                    className="role_dropdown"
                                    name="role_dropdown"
                                    onChange={values => setSelectedRole(values.value)}
                                    id="selectedUserRole"
                                    data-testid="roleDropDown"
                                />
                            ) : (
                                <p className="createUserLoadTitle">Loading...</p>
                            )}

                            <p className="createUserError" id="createUserError">{errMsg}</p>
                            <button className="createUserFinish" data-testid="createuser_finish"
                                    onClick={useHandleClick}>

                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </Popup>
);
}
;

export default CreateUserPopup;
