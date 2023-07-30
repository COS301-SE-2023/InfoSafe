import '../styling/Home.css';
import React, { useState } from 'react';
import NavBar from './NavBar';
import {IoPersonCircleSharp} from "react-icons/io5";
/* eslint-disable react/prop-types */
/* eslint-disable  no-unused-vars */
//import various things to be displayed

const Home = () => {
    if(sessionStorage.getItem('accessToken') == null)
        window.location.href = "/";

        const [systemRole, setRole] = useState('DISO');
        const [settings, showSettings] = useState(false);

        const showDiv = () =>
        {
            showSettings(!settings);
        };
        const handleRole = (RoleIndex) => {
            setRole(RoleIndex);
        };

        return (
            <div className="backdrop">
                <NavBar systemRole={systemRole}/>

                <div className="activeUser">
                    <p className="userDisplay" >Jane Doe</p>
                    <IoPersonCircleSharp className="avatar" onClick={showDiv} />
                    {settings &&
                        <div className="settingsDiv">

                            <p className="logoutLabel" onClick={() => console.log("Logout User")}>Logout</p>
                        </div>
                    }
                </div>

            </div>
        );
};

export default Home;
