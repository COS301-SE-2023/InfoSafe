import Popup from "reactjs-popup";
import React, {useState} from "react";
import "../../styling/UpdateTask.css";
import { IoArrowBackOutline } from "react-icons/io5";
import Dropdown from "react-dropdown";
/* eslint-disable react/prop-types */
/* eslint-disable  no-unused-vars */
const TASK_ID = ["TASK 1", "TASK 2", "TASK 3"];
const USER_LIST = ["USER A", "USER B", "USER C", "USER D"];
export const UpdateTask = ({ task, popupClose, popupOpen }) => {
    const[values, setValues]=useState({
        task_id: task.task_id,
        date_completed: task.date_completed,
        due_date: task.due_date,
        task_description: task.task_description,
        task_status: task.task_status
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values)
        fetch("http://ec2-174-129-77-195.compute-1.amazonaws.com:8080/api/task/update/" + task.task_id, {
            method:"PUT",
            headers:{"Content-Type":"application/json",
                Authorization: "Bearer " + sessionStorage.getItem("accessToken")
            },
            body:JSON.stringify(values)
        }).then(()=>{
            console.log("Updated Task")
        })
        //console.log(JSON.stringify(values))
        popupClose()
    }

    return (
        <Popup open={popupOpen} closeOnDocumentClick={false}>
            <div className='updateTaskOverlay'>
                <div className='borderUpdateTask'>
                    <button className='backButton' onClick={popupClose} data-testid='back-button'>
                        <IoArrowBackOutline className='backIcon' />
                    </button>
                    <form>
                        <p className='pageTitle'>Update Task</p>
                        <p className='inputTitle'>Task ID</p>
                        <Dropdown
                            options={TASK_ID}
                            value={TASK_ID[0]}
                            className='updateTaskIDDropdown'
                            name='updateTaskIDDropdown'
                        />
                        <p className='inputTitle'>Assignee</p>
                        <Dropdown
                            options={USER_LIST}
                            value={USER_LIST[0]}
                            className='updateTaskAssigneeDropdown'
                            name='updateTaskAssigneeDropdown'
                        />
                        <p className='inputTitle'>Task Description</p>
                        <textarea className='inputTextArea' />
                        <p className='inputTitle'>Completion Date</p>
                        <input
                            className='textboxInput'
                            type='text'
                            id='inputTextArea'
                            name='completionDate'
                        />
                        <div className='updateTaskButtonDiv'>
                            <button className='updateTaskSubmitButton' type='submit'>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Popup>
    );
};

export default UpdateTask;
