import '../styling/Home.css';
import React, { useState } from 'react';
import NavBar from './NavBar';
/* eslint-disable react/prop-types */
/* eslint-disable  no-unused-vars */
//import various things to be displayed

const Home = () => {
    const [systemRole, setRole] = useState('ISO');

    const handleRole = (RoleIndex) => {
        setRole(RoleIndex);
    };

    return (
        <div className="backdrop">
            <NavBar systemRole={systemRole} />
        </div>
    );
};

export default Home;
