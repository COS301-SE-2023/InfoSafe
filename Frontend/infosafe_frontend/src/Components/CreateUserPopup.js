import React, {useState} from 'react';
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
export const CreateUserPopup = ({ closeCreateUserOpen }) => {
    const[name,setName]=useState('')
    const[surname,setSurname]=useState('')
    const[email,setEmail]=useState('')
    const[role,setRole]=useState('ISO')
    const[password,setPassword]=useState('')

    const handleClick=(e)=> {
        e.preventDefault()
        const user = {name, surname, email, password, role}
        console.log(user)
    }

    return (
        <Popup open={true} onClose={closeCreateUserOpen} position="center center">
            <div className="createUserOverlay">
                <div className="border">
                    <form>
                        <p className="pageLabel">User Creation</p>
                        <p className="nameLabel">Name</p>
                        <input className="nameInput" name="name" />
                        <p className="surnameLabel">Surname</p>
                        <input className="surnameInput" name="surname" />
                        <p className="emailLabel">Email</p>
                        <input className="emailInput" name="email" />
                        <p className="passwordLabel">Password</p>
                        <input className="passwordInput" name="password" />
                        <button className="genPassword">Generate Password</button>
                        <p className="label_role">System role</p>
                        <Dropdown
                            options={role_options}
                            value={role_options[0]}
                            className="role_dropdown"
                            name="role"
                        />
                        <button className="btn_finish" onClick={closeCreateUserOpen}>
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
