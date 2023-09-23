import Popup from 'reactjs-popup';
import React from 'react';
import '../../styling/ViewTask.css';
import { IoArrowBackOutline } from 'react-icons/io5';
import ViewAccessRequest from "./ViewAccessRequest";
/* eslint-disable react/prop-types */
/* eslint-disable  no-unused-vars */
export const ViewTask = ({ task, popupClose, popupOpen }) => {
    return (
        <Popup open={popupOpen} closeOnDocumentClick={false}>
            <div className="viewTaskOverlay">
                <div className="popupBackground">
                <div className="borderViewTask">
                    <button className="viewTaskBackButton" onClick={popupClose} data-testid="back-button">
                        <IoArrowBackOutline className="viewTaskBackIcon" />
                    </button>
                    <p className="pageTitle">View Task</p>
                    <p className="displayTitle">Task Name</p>
                    <p className="displayData">Task {task.task_name}</p>
                    <p className="displayTitle">Data Scope</p>
                    <p className="displayData">{task.dataScope.ds_name}</p>
                    <p className="displayTitle">Task Description</p>
                    <textarea className="viewTextArea" readOnly={true} value={task.task_description}/>
                    <p className="displayTitle">Task Status</p>
                    <p className="displayData">{task.task_status}</p>
                    <p className="displayTitle">Completion Date</p>
                    <p className="displayData">{task.due_date}</p>
                </div>
                </div>
            </div>
        </Popup>
    );
};

export default ViewTask;
