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
                    <p className="viewTaskDisplayTitle">Task Name</p>
                    <p className="viewTaskDisplayData">Task {task.task_name}</p>
                    <p className="viewTaskDisplayLabel">Data Scope</p>
                    <p className="viewTaskDisplayData">{task.dataScope.ds_name}</p>
                    <p className="viewTaskDisplayLabels">Task Description</p>
                    <textarea className="viewTextArea" readOnly={true} value={task.task_description}/>
                    <p className="viewTaskDisplayLabel">Task Status</p>
                    <p className="viewTaskDisplayData">{task.task_status}</p>
                    <p className="viewTaskDisplayCompletionDate">Completion Date</p>
                    <p className="viewTaskDisplayCompletionDateData">{task.due_date}</p>
                </div>
                </div>
                </div>
            </div>
        </Popup>
    );
};

export default ViewTask;
