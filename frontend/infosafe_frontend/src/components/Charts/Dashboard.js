import '../../styling/Dashboard.css';
import React, {useEffect, useState} from 'react';
import {IoPersonCircleSharp, IoMenu} from "react-icons/io5";
import SystemAnalyticsChart from './SystemAnalyticsChart';
import TasksChart from './TasksChart';
import {FaCircle} from 'react-icons/fa';
import { useCurrentDataScope } from './useCurrentDataScope';
import {useCurrentTasks} from "./useCurrentTasks.js";
import {useGetPerms} from "../getData/getPerms";
export const Dashboard = () => {
    const myDevicesList = ['Zenbook Pro 15', 'PowerGuardian 1500', 'QuantumTab S7', 'Device 4', 'Device 5', 'Device 6', 'Device 7', 'Device 8', 'Device 9', 'Device 10'];
    const notificationsList = ['The status for Support Request 6 has been updated.', 'The status for Support Request 4 has been updated.', 'The status for Support Request 2 has been updated.', 'You have been added to Data Scope 40.' ];
    const userTasks = ['Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5', 'Task 6', 'Task 7', 'Task 8', 'Task 9'];
    const taskDeadlines = ['1 month', '1 week', '1 day', '1 month', '1 week', '1 day', '1 month', '1 week', '1 day'];
    const { dataScopeCount, myDataScopeCount, assetCount, myAssets} = useCurrentDataScope();
    const {taskCount, myTasks} = useCurrentTasks();
    const {roles} = useGetPerms();
    let datascopeDisplay = 0;

    if(roles.includes("data_scope_create") || roles.includes("data_scope_edit") || roles.includes("data_scope_delete")){
        datascopeDisplay = dataScopeCount;
    } else{
        datascopeDisplay = myDataScopeCount;
    }
    return (
        <div className="display">
            <div className="dashboardBackground">
                <div className="quickFacts">
                    <div className="dataScopesInfo">  {/*Display the number of data scopes the user is involved in*/}
                        <p className="dataScopesInfoLabel">Current Data Scopes</p>
                        <p className="dataScopesInfoDisplay">{datascopeDisplay}</p>
                    </div>
                    <div className="currentTasksInfo">  {/*Display the number of tasks associated with the user.*/}
                        <p className="currentTasksInfoLabel">Current Tasks</p>
                        <p className="currentTasksInfoDisplay">{taskCount}</p>
                    </div>
                    <div className="currentDevicesInfo">  {/*Display the number of devices associated with the user.*/}
                        <p className="currentDevicesInfoLabel">Current Devices</p>
                        <p className="currentDevicesInfoDisplay">{assetCount}</p>
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
                    <div className="userTaskDeadlinesDiv">
                        <p className="userTaskDeadlinesLabel">Approaching Deadlines</p>
                        <div className="deadlinesDiv">
                            <ul className="taskDeadlinesList">
                                {userTasks.map((task, index) => (
                                    <li key={index}>
                                        <p>{task}</p>
                                        {taskDeadlines[index] === '1 month' && (
                                            <div className="oneMonthDeadline">{taskDeadlines[index]}</div>
                                        )}
                                        {taskDeadlines[index] === '1 week' && (
                                            <div className="oneWeekDeadline">{taskDeadlines[index]}</div>
                                        )}
                                        {taskDeadlines[index] === '1 day' && (
                                            <div className="oneDayDeadline" >{taskDeadlines[index]}</div>
                                        )}
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
        </div>

    );
};