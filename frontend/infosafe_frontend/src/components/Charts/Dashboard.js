import '../../styling/Dashboard.css';
import React, {useEffect, useState} from 'react';
import {IoPersonCircleSharp, IoMenu} from "react-icons/io5";
import SystemAnalyticsChart from './SystemAnalyticsChart';
import TasksChart from './TasksChart';
import {FaCircle} from 'react-icons/fa';
import {useCurrentDataScope} from './useCurrentDataScope';
import {useCurrentTasks} from "./useCurrentTasks.js";
import {useGetPerms} from "../getData/getPerms";

export const Dashboard = () => {
        const {dataScopeCount, myDataScopeCount, assetCount, myAssets} = useCurrentDataScope();
        const {taskCount, myTasks} = useCurrentTasks();
        const [notifications, setNotifications] = useState([]);
        const {roles} = useGetPerms();
        const [dataLoaded, setDataLoaded] = useState(false);
        const [totalRequest, setTotalRequest] = useState(0)
        let datascopeDisplay = 0;

        useEffect(() => {
            const fetchData = async () => {
                const accessToken = sessionStorage.getItem('accessToken');

                const fetchPromises = [
                    await fetch('https://infosafe.live/api/notifications/getNotifications', {
                        method: "GET",
                        headers: {
                            Authorization: "Bearer " + accessToken,
                        },
                    }),
                    await fetch('https://infosafe.live/api/supportrequest/getMyTotal', {
                        method: "GET",
                        headers: {
                            Authorization: "Bearer " + accessToken,
                        },
                    }),
                    await fetch('https://infosafe.live/api/accessrequest/getMyTotal', {
                        method: "GET",
                        headers: {
                            Authorization: "Bearer " + accessToken,
                        },
                    }),
                    await fetch('https://infosafe.live/api/assetrequest/getMyTotal', {
                        method: "GET",
                        headers: {
                            Authorization: "Bearer " + accessToken,
                        },
                    }),
                ];

                try{
                    const responses = await Promise.all(fetchPromises);
                    const data = await Promise.all(responses.map((res) => res.json()));
                    const [notifications, suppTotal, accessTotal, assetTotal] = data;
                    setTotalRequest(suppTotal+accessTotal+assetTotal)
                    setNotifications(notifications)
                    setDataLoaded(true);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };

            fetchData();
        }, []);

        if (roles.includes("data_scope_create") || roles.includes("data_scope_edit") || roles.includes("data_scope_delete")) {
            datascopeDisplay = dataScopeCount;
        } else {
            datascopeDisplay = myDataScopeCount;
        }

        return (
            <div className="display">
                <div className="dashboardBackground">
                    <div className="quickFacts">
                        <div
                            className="dataScopesInfo">  {/*Display the number of data scopes the user is involved in*/}
                            <p className="dataScopesInfoLabel">Current Data Scopes</p>
                            <p className="dataScopesInfoDisplay">{datascopeDisplay}</p>
                        </div>
                        <div
                            className="currentTasksInfo">  {/*Display the number of tasks associated with the user.*/}
                            <p className="currentTasksInfoLabel">Current Tasks</p>
                            <p className="currentTasksInfoDisplay">{taskCount}</p>
                        </div>
                        <div
                            className="currentDevicesInfo">  {/*Display the number of devices associated with the user.*/}
                            <p className="currentDevicesInfoLabel">Current Devices</p>
                            <p className="currentDevicesInfoDisplay">{assetCount}</p>
                        </div>
                        <div
                            className="currentRequestsInfo">  {/*Display the number of requests associated with the user.*/}
                            <p className="currentRequestsInfoLabel">Current Requests</p>
                            <p className="currentRequestsInfoDisplay">{totalRequest}</p>
                        </div>
                    </div>
                    <div className="analytics">
                        <div className="systemAnalyticsDiv">
                            <div className="systemLabels">
                                <p className="systemAnalyticsLabel">System Analytics</p>
                                <div className="barLabels">
                                    <div className="systemTotals">
                                        <FaCircle className="systemIcon"/>
                                        <p className="systemTotalLabel">System Total</p>
                                    </div>
                                    <div className="myTotals">
                                        <FaCircle className="myTotalIcon"/>
                                        <p className="myTotalLabel">My Total</p>
                                    </div>
                                </div>
                            </div>
                            <SystemAnalyticsChart/>
                        </div>
                        <div className="userTaskDiv">
                            <p className="userTaskLabel">Tasks</p>
                            <TasksChart/>
                            <div className="chartLabels">
                                <div className="tasksLeftDiv">
                                    <FaCircle className="tasksLeftIcon"/>
                                    <p className="tasksLeftLabel">Tasks Left</p>
                                </div>
                                <div className="tasksCompletedDiv">
                                    <FaCircle className="tasksCompletedIcon"/>
                                    <p className="tasksCompletedLabel">Tasks Completed</p>
                                </div>

                            </div>
                        </div>
                        <div className="userTaskDeadlinesDiv">
                            <p className="userTaskDeadlinesLabel">Approaching Deadlines</p>
                            <div className="deadlinesDiv">
                                <ul className="taskDeadlinesList">
                                    {myTasks.map((task, index) => (
                                        <li key={index}>
                                            <p>{task.task_name}</p>
                                            <p className={`deadline${(index % 3) + 1}`}>{`${task.daysUntilDue} days until due`}</p>
                                        </li>
                                    ))}
                                </ul>

                            </div>
                        </div>
                    </div>
                    <div className="infoDiv">
                        <div className="myDevicesDiv">
                            <p className="myDevicesLabel">Devices in Use</p>
                            <div className="myDevicesDisplay">
                                <ul className="inUseDevicesList">
                                    {myAssets.map((assets, index) => (
                                        <li key={index}>
                                            <p>{assets.asset_name}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="notificationsDiv">
                            <p className="notificationsLabel">Notifications</p>
                            <div className="notificationsDisplay">
                                <ul className="myNotificationsList">
                                    {notifications.map((notification, index) => (
                                        <li key={index}>
                                            <p className="notificationsInfo">
                                                <p className={`deadline${(index % 3) + 1}`}>{`${notification.timeMade}`}</p> {/*className="timeDisplay"*/}
                                                <p className="notificationsMessage">{notification.notification}</p>
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
;

export default Dashboard;
