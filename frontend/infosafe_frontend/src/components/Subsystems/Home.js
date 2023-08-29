import '../../styling/Home.css';
import React, {useEffect, useState} from 'react';
import NavBar from './NavBar';
import {IoPersonCircleSharp} from "react-icons/io5";

export const Home = () => {
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

    return (
        <div className="backdrop">
            <NavBar></NavBar>

            <div className="activeUser">
                <p className="userDisplay" >{username}</p>
                <IoPersonCircleSharp className="avatar" onClick={showDiv} />
                {settings &&
                    <div className="settingsDiv">
                        <p className="logoutLabel" onClick={() => {sessionStorage.removeItem('accessToken'); window.location.href = "/";} }>Logout</p>
                    </div>
                }
            </div>

        </div>
    );
};