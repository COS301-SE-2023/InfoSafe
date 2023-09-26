import Popup from 'reactjs-popup';
import React, {useState} from 'react';
import '../../styling/ViewTask.css';
import {IoArrowBackOutline} from 'react-icons/io5';
import ViewAccessRequest from "./ViewAccessRequest";

export const ViewTask = ({task, popupClose, popupOpen}) => {

    const handleCompleted = () => {
        console.log("Complete")
        const request = {completion: true, task_id: task.task_id};
        fetch("http://localhost:8080/api/task/completeTask", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
            },
            body: JSON.stringify(request),
        }).then((response) => response.json())
            .then((data) => {
                console.log("Task marked as completed");
                popupClose();
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        popupClose();
    }

    const handleIncomplete = () => {
        console.log("Incomplete")
        const request = {completion: false, task_id: task.task_id};
        fetch("http://localhost:8080/api/task/completeTask", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
            },
            body: JSON.stringify(request),
        }).then((response) => response.json())
            .then((data) => {
                console.log("Task marked as incomplete");
                popupClose();
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        popupClose();
    }

return (
    <Popup open={popupOpen} closeOnDocumentClick={false}>
        <div className="viewTaskOverlay">
            <div className="popupBackground">
                <div className="borderViewTask">
                    <button className="viewTaskBackButton" onClick={popupClose} data-testid="back-button">
                        <IoArrowBackOutline className="viewTaskBackIcon"/>
                    </button>
                    <p className="viewTaskPageTitle">View Task</p>
                    <div className="viewTaskContent">
                        <p className="viewTaskDisplayTitle">Task Name</p>
                        <p className="viewTaskDisplayData">{task.task_name}</p>
                        <p className="viewTaskDisplayTitle">Data Scope</p>
                        <p className="viewTaskDisplayData">{task.dataScope.ds_name}</p>
                        <p className="viewTaskDisplayTitle">Task Description</p>
                        <textarea className="viewTaskTextArea" readOnly={true} value={task.task_description}/>
                        <p className="viewTaskDisplayLabel">Task Status</p>
                        <p className="viewTaskDisplayStatus">{task.task_status}</p>
                        <p className="viewTaskDisplayCompletionDate">Completion Date</p>
                        <p className="viewTaskDisplayCompletionDateData">{task.due_date}</p>
                    </div>
                    <div className="viewTaskButtons">
                        <button type="button" className="completedButton" onClick={handleCompleted}>
                            Completed
                        </button>
                        <button type="button" className="incompleteButton" onClick={handleIncomplete}>
                            Incomplete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </Popup>
);
}
;

export default ViewTask;
