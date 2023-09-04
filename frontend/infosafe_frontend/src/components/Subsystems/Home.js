import '../../styling/Home.css';
import React, {useEffect, useState} from 'react';
import NavBar from './Navbar';
import {IoPersonCircleSharp, IoMenu} from "react-icons/io5";
import SystemAnalyticsChart from '../Charts/SystemAnalyticsChart';
import TasksChart from '../Charts/TasksChart';
import {FaCircle} from 'react-icons/fa';

export const Home = () => {

    const [menuVisible, setMenuVisible] = useState(false);

    if(sessionStorage.getItem('accessToken') == null) {
        window.location.href = "/";
    }
    const [settings, showSettings] = useState(false);
    const [username, setUserName] = useState('');

    useEffect(() => {
        fetch('http://localhost:8080/api/user/getUserName', {
            method: "GET",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            }
        })
            .then((res) => res.json())
            .then((result) => {
                setUserName(result.username);
            });
    }, []);
    const showDiv = () =>
    {
        showSettings(!settings);
    };

    const displayMenu = () => {
        setMenuVisible(!menuVisible);
        if (!menuVisible)
        {
            document.getElementById("tabMenu").style.display = "inline";
            // document.getElementById("backdrop").style.backgroundColor = "red";
        }
        else
        {
            document.getElementById("tabMenu").style.display = "none";
        }
    };


    return (
        <div className="backdrop" id="backdrop">
            <div className="toolbar">
                <div className="toolbarLeft">
                     <IoMenu className="menuIcon" onClick={displayMenu} />
                     <p className="tabTitle">Home</p>  {/*Get this from the respective tabs*/}
                </div>
                <div className="toolbarRight">
                    <p className="userDisplay" >{username}</p>
                    <IoPersonCircleSharp className="avatar" onClick={showDiv} />
                    {settings &&
                        <div className="settingsDiv">
                            <p className="logoutLabel" onClick={() => {sessionStorage.removeItem('accessToken'); window.location.href = "/";} }>Logout</p>
                        </div>
                    }
                </div>
            </div>
            <NavBar />
        </div>
    );
};
export default Home;