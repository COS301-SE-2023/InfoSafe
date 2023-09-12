import '../styling/Home.css';
import React, {useEffect, useState} from 'react';
import NavBar from './NavBar';
import {IoPersonCircleSharp} from "react-icons/io5";

const Home = () => {
    if(sessionStorage.getItem('accessToken') == null)
        window.location.href = "/";

    const [systemRole, setRole] = useState();
    const [settings, showSettings] = useState(false);
    const [username, setUserName] = useState('');

    useEffect(() => {
        fetch('http://ec2-3-87-39-90.compute-1.amazonaws.com:80/api/user/getRole', {
            method: "GET",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            }
        })
            .then((res) => res.json())
            .then((result) => {
                setRole(result);
            });
    }, []);

    useEffect(() => {
        fetch('http://ec2-3-87-39-90.compute-1.amazonaws.com:80/api/user/getUserName', {
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
                <NavBar systemRole={systemRole}/>

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

export default Home;
