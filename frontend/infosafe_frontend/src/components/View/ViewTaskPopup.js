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
                    <p className="viewTaskPageTitle">View Task</p>
                    <div className="viewTaskContent">
                    <p className="viewTaskDisplayTitle">Task ID</p>
                    <p className="viewTaskDisplayData">Task {task.task_id}</p>
                    <p className="viewTaskDisplayTitle">Data Scope</p>
                    <p className="viewTaskDisplayData">Data Scope A</p>
                    <p className="viewTaskDisplayTitle">Task Description</p>
                    <textarea className="viewTaskTextArea" readOnly={true} value={task.task_description}/>
                    <p className="viewTaskDisplayTitle">Completion Date</p>
                    <p className="viewTaskDisplayData">{task.due_date}</p>
                </div>
                </div>
            </div>
            </div>
        </Popup>
    );
};

export default ViewTask;
