import '../Styling/Home.css';
import React, { useState } from 'react';
import NavBar from './NavBar';

//import various things to be displayed

const Home = () => {
    const [systemRole, setRole] = useState('ISO');

    const handleRole = (RoleIndex) => {
        setRole(RoleIndex);
    };

    return (
        <div className="backdrop">
            <div className="tabs">
                <NavBar systemRole={systemRole} />
            </div>
        </div>
    );
};

export default Home;
