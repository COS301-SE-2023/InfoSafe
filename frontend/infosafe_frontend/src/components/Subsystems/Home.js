import "../../styling/Home.css";
import React from "react";
import NavBar from "./Navbar";

export const Home = () => {
    return (
        <div className='backdrop' id='backdrop'>
            <NavBar />
        </div>
    );
};
export default Home;