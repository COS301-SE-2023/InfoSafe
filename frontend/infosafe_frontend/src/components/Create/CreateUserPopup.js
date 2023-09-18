import React, {useEffect, useState} from 'react';
import Dropdown from 'react-dropdown';
import '../../styling/CreateUserPopup.css';
import '../../styling/Dropdown.css'
import Popup from 'reactjs-popup';
import { IoArrowBackOutline } from 'react-icons/io5';

export const CreateUserPopup = ({ popupOpen, popupClose }) => {
    const[first_name,setName]=useState('')
    const[last_name,setSurname]=useState('')
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const [roleNames, setRoleNames] = useState('')
    const [selectedRole, setSelectedRole] = useState('');
    const handleClick = (e) => {
        e.preventDefault();
        const user = { first_name, last_name, email, password, role: { role_name: selectedRole } };


        fetch(`http://ec2-3-87-39-90.compute-1.amazonaws.com:80/api/user/checkEmail?email=${email}`, {
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
                    fetch("http://ec2-3-87-39-90.compute-1.amazonaws.com:80/api/user/add", {
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
                const response = await fetch("http://ec2-3-87-39-90.compute-1.amazonaws.com:80/api/randPass/generate", {
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

    useEffect(() => {
            fetch("http://localhost:8080/api/role/getRoleNames", {
                method:"GET",
                headers:{"Content-Type":"application/json",
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
                <div className="createUserBorder">
                    <form>
                        <button className="backButton" data-testid="backArrow" onClick={popupClose}>
                            <IoArrowBackOutline className="backIcon" />
                        </button>
                        <p className="createUserLabel">User Creation</p>
                        <p className="nameLabel">Name</p>
                        <input className="nameInput" data-testid="nameInput" name="name" value={first_name} onChange={(e)=>setName(e.target.value)}/>
                        <p className="surnameLabel">Surname</p>
                        <input className="surnameInput" data-testid="surnameInput" name="surname" value={last_name} onChange={(e)=>setSurname(e.target.value)}/>
                        <p className="emailLabel">Email</p>
                        <input className="emailInput" data-testid="emailInput" name="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        <p className="passwordLabel">Password</p>
                        <input className="passwordInput" data-testid="passwordInput" name="password" placeholder={password} readOnly/>
                        <p className="roleLabel">System role</p>
                        {roleNames && roleNames.length > 0 ? (
                            <Dropdown
                                options={roleNames.map(roleName => ({ label: roleName, value: roleName }))}
                                values={selectedRole  ? [{ label: selectedRole, value: selectedRole  }] : []}
                                className="role_dropdown"
                                name="role_dropdown"
                                onChange={values => setSelectedRole(values.value)}
                            />
                        ) : (
                            <p className="loadTitle">Loading...</p>
                        )}

                        <button className="createUserFinish" data-testid="createuser_finish"  onClick={handleClick}>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </Popup>
    );
};
