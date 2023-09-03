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
    };

    const myDevicesList = ['Zenbook Pro 15', 'PowerGuardian 1500', 'QuantumTab S7', 'Device 4', 'Device 5', 'Device 6', 'Device 7', 'Device 8', 'Device 9', 'Device 10'];
    const notificationsList = ['The status for Support Request 6 has been updated.', 'The status for Support Request 4 has been updated.', 'The status for Support Request 2 has been updated.', 'You have been added to Data Scope 40.' ];
    return (
        <div className="backdrop">
            <div className="toolbar">
                <div className="toolbarLeft">
                     <IoMenu className="menuIcon" onClick={displayMenu} />
                    {menuVisible && <NavBar />}
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
            <div className="quickFacts">
                <div className="dataScopesInfo">  {/*Display the number of data scopes the user is involved in*/}
                    <p className="dataScopesInfoLabel">Current Data Scopes</p>
                    <p className="dataScopesInfoDisplay">50</p>
                </div>
                <div className="currentTasksInfo">  {/*Display the number of tasks associated with the user.*/}
                    <p className="currentTasksInfoLabel">Current Tasks</p>
                    <p className="currentTasksInfoDisplay">100</p>
                </div>
                <div className="currentDevicesInfo">  {/*Display the number of devices associated with the user.*/}
                    <p className="currentDevicesInfoLabel">Current Devices</p>
                    <p className="currentDevicesInfoDisplay">10</p>
                </div>
                <div className="currentRequestsInfo">  {/*Display the number of requests associated with the user.*/}
                    <p className="currentRequestsInfoLabel">Current Requests</p>
                    <p className="currentRequestsInfoDisplay">60</p>
                </div>
            </div>
            <div className="analytics">
                <div className="systemAnalyticsDiv">
                    <div className="systemLabels">
                        <p className="systemAnalyticsLabel">System Analytics</p>
                        <div className="barLabels">
                            <div className="systemTotals">
                                <FaCircle className="systemIcon" />
                                <p className="systemTotalLabel">System Total</p>
                            </div>
                          <div className="myTotals">
                              <FaCircle className="myTotalIcon" />
                              <p className="myTotalLabel">My Total</p>
                          </div>


                        </div>
                    </div>
                    <SystemAnalyticsChart />
                </div>
                <div className="userTaskDiv">
                    <p className="userTaskLabel">Tasks</p>
                    <TasksChart />
                    <div className="chartLabels">
                        <div className="tasksLeftDiv">
                            <FaCircle className="tasksLeftIcon" />
                            <p className="tasksLeftLabel">Tasks Left</p>
                        </div>
                        <div className="tasksCompletedDiv">
                            <FaCircle className="tasksCompletedIcon" />
                            <p className="tasksCompletedLabel">Tasks Completed</p>
                        </div>

                    </div>
                </div>
                <div className="userSupportRequestsDiv">
                    <p className="userSupportRequestsLabel">Support Requests</p>
                </div>
            </div>
            <div className="infoDiv">
                <div className="myDevicesDiv">
                    <p className="myDevicesLabel">Devices in Use</p>
                    <div className="myDevicesDisplay">
                        <ul className="inUseDevicesList">
                            {myDevicesList.map((deviceName, index) => (
                                <li key={index}>
                                    <p>{deviceName}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="notificationsDiv">
                    <p className="notificationsLabel">Notifications</p>
                    <div className="notificationsDisplay">
                        <ul className="myNotificationsList">
                            {notificationsList.map((notification, index) => (
                                <li key={index}>
                                    <div className="notificationsInfo">
                                        <div className="timeDisplay">11:00</div>
                                        <p className="notificationsMessage">{notification}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            </div>

    );
};
export default Home;