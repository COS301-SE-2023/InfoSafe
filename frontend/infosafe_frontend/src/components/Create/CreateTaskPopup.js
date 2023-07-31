import Popup from 'reactjs-popup';
import React, {useState} from 'react';
import '../../styling/CreateTask.css';
import { IoArrowBackOutline } from 'react-icons/io5';
import Dropdown from 'react-dropdown';
import Select from "react-select/base";
/* eslint-disable react/prop-types */
/* eslint-disable  no-unused-vars */
const TASK_TYPES = ['COMPLIANCE MATRIX', 'RISK', 'SUPPORT REQUEST'];
const DATA_SCOPES = ['DATA SCOPE 1', 'DATA SCOPE 2', 'DATA SCOPE 3', 'DATA SCOPE 4'];
const USER_LIST = ['USER A', 'USER B', 'USER C', 'USER D'];
export const CreateTask = ({ popupClose, popupOpen }) => {
    const [task_description, setTaskDescription] = useState('');
    const [task_status, setTaskStatus] = useState('');
    const [due_date, setDueDate] = useState('');
    const [date_created, setDateCreated] = useState('');
    const [user_id, setUserId] = useState([]);
    const [task_id, setTaskId] = useState('');
    const [selectedUsers, setSelectedUsers] = useState();

    const handleClick=(e)=> {
        e.preventDefault()
        const task = {task_description, task_status,  due_date, date_created}
        const assignedtask = {task_id, user_id}
        fetch("http://localhost:8080/api/task/addTask", {
            method:"POST",
            headers:{"Content-Type":"application/json",
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            },
            body:JSON.stringify(task)
        }).then(()=>{
            console.log("New task added")
        })
        popupClose()
    };

    //Adds users to the array on selection change
    function handleSelect(data){
        selectedUsers(data);
    }

    return (
        <Popup open={popupOpen} closeOnDocumentClick={false}>
            <div className="createTaskOverlay">
                <div className="borderCreateTask">
                    <button className="backButton" onClick={popupClose}>
                        <IoArrowBackOutline className="backIcon" />
                    </button>
                    <form>
                        <p className="pageTitle">Create Task</p>
                        <p className="inputTitle">Type</p>
                        <Dropdown
                            options={TASK_TYPES}
                            value={TASK_TYPES[1]}
                            className="createTaskTypeDropdown"
                            name="createTaskTypeDropdown"
                        />
                        <p className="inputTitle">Data Scope</p>
                        <Dropdown
                            options={DATA_SCOPES}
                            value={DATA_SCOPES[1]}
                            className="createTaskDataScopeDropdown"
                            name="createTaskDataScopeDropdown"
                        />
                        <p className="inputTitle">Assignee</p>
                        <Select  //Dropdown
                            options={USER_LIST}
                            value={selectedUsers}//{USER_LIST[1]}
                            className="createTaskAssigneeDropdown"
                            name="createTaskAssigneeDropdown"
                            placeholder={"Add Assignees"}
                            onChange={handleSelect}
                            isSearchable={true}
                            isMulti
                        />
                        <p className="inputTitle">Task Description</p>
                        <textarea className="inputTextArea" />
                        <p className="inputTitle">Completion Date</p>
                        <input
                            className="textboxInput"
                            type="text"
                            id="inputTextArea"
                            name="completionDate"
                        />
                        <div className="createTaskButtonDiv">
                            <button className="createTaskSubmitButton" type="submit" onClick={popupClose}>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Popup>
    );
};
