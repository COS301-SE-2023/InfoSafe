import '../../styling/Home.css';
import React, {useEffect, useState} from 'react';
import NavBar from './Navbar';

export const Home = () => {
    return (
        <div className="backdrop" id="backdrop">
            <NavBar />
        </div>
    );
};
export default Home;