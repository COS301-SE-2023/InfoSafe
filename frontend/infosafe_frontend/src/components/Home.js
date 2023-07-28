import '../styling/Home.css';
import React, { useState } from 'react';
import NavBar from './NavBar';
/* eslint-disable react/prop-types */
/* eslint-disable  no-unused-vars */
//import various things to be displayed

const Home = () => {
    if(sessionStorage.getItem('accessToken') == null)
        window.location.href = "/";


        const [systemRole, setRole] = useState('Data Custodian'); // intergrate this
        const handleRole = (RoleIndex) => {
            setRole(RoleIndex);
        };

        return (
            <div className="backdrop">
                <NavBar systemRole={systemRole}/>
            </div>
        );
};

export default Home;
