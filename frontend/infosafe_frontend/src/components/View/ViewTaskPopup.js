import Popup from 'reactjs-popup';
import React, {useEffect, useState} from 'react';
import '../../styling/ViewTask.css';
import {IoArrowBackOutline} from 'react-icons/io5';
import ViewAccessRequest from "./ViewAccessRequest";
import Select from "react-select";
import {customStyles} from "../CustomStyling";

export const ViewTask = ({task, popupClose, popupOpen}) => {
    const [currentUsers, setCurrentUsers] = useState([]);
    const [addUsers, setAddUsers] = useState([]);
        const[values, setValues]=useState({
            task_id: '',
            task_name: '',
            date_created: '',
            due_date: '',
            task_description: '',
            task_status: ''
        });

        useEffect(() => {
            fetch("http://ec2-52-91-180-105.compute-1.amazonaws.com:8080/api/task/getUsersOfTask/" + task.task_id, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem('accessToken')
                }
            })
                .then((res) => res.json())
                .then((result) => {
                    setCurrentUsers(result)
                    setAddUsers(result)
                });

        }, [task]);

        useEffect(()=> {
            //console.log(task)
            if (task) {
                setValues({
                    task_id: task.task_id,
                    task_name: task.task_name,
                    date_created: task.date_created,
                    due_date: task.due_date,
                    task_description: task.task_description,
                    task_status: task.task_status,
                    dataScope_id: task.data_scope_id.dataScope_id,
                    daysUntilDue: task.daysUntilDue
                });
            }
        },[task]);

    const handleCompleted = () => {
        console.log("Complete")
        const request = {completion: true, task_id: task.task_id};
        fetch("http://ec2-52-91-180-105.compute-1.amazonaws.com:8080/api/task/completeTask", {
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
        fetch("http://ec2-52-91-180-105.compute-1.amazonaws.com:8080/api/task/completeTask", {
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
                    <p className="viewTaskDisplayTitle">Task Name</p>
                    <p className="viewTaskDisplayData">{task.task_name}</p>
                    <p className="viewTaskDisplayTitle">Data Scope</p>
                    <p className="viewTaskDisplayData">{task.data_scope_id.ds_name}</p>
                    <p className="viewTaskDisplayTitle">Task Description</p>
                    <textarea className="viewTaskTextArea" readOnly={true} value={task.task_description}/>
                    <p className="editTaskLabels">Users</p>
                    {currentUsers && currentUsers.length > 0 ? (
                        <Select
                            options={currentUsers.map((email) => ({value: email, label: email}))}
                            value={currentUsers.map((email) => ({value: email, label: email}))}
                            placeholder={currentUsers[0]}
                            className="editTaskAssignees"
                            name="editTaskAssignees"
                            styles={customStyles}
                        /> ) : (
                        <p className='viewTaskLoadLabel'>Loading...</p>
                    )}
                    <p className="viewTaskDisplayLabel">Task Status</p>
                    <p className="viewTaskDisplayStatus">{task.task_status}</p>
                    <p className="viewTaskDisplayCompletionDate">Completion Date</p>
                    <p className="viewTaskDisplayCompletionDateData">{task.due_date}</p>
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
