import Popup from 'reactjs-popup';
import React, {useEffect, useState} from 'react';
import '../../styling/CreateTask.css';
import { IoArrowBackOutline } from 'react-icons/io5';
import Dropdown from 'react-dropdown';
import Select from 'react-select/base';

export const CreateTask = ({ popupClose, popupOpen }) => {
    const [task_description, setTaskDescription] = useState('');
    const [task_status, setTaskStatus] = useState('');
    const [due_date, setDueDate] = useState('');
    const [date_created, setDateCreated] = useState('');
    const [user_id, setUserId] = useState([]);
    const [task_id, setTaskId] = useState('');
    const [selectedUsers, setSelectedUsers] = useState();
    const [users, setUsers] = useState([]);

    const handleDescriptionChange = (e) => {
        setTaskDescription(e.target.value);
    };
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

    useEffect(() => {
        fetch("http://localhost:8080/api/user/getAll", {
            method: "GET",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            }
        })
            .then((res) => res.json())
            .then((result) => {
                setUsers(result);
            });
    }, []);
    //Adds users to the array on selection change
    const handleSelect = (e) =>{
        selectedUsers(e.target.value);
    }
    const handleDateChange = (date) => {
        setDateCreated(formatDate(date));
    };
    const formatDate = (date) => {
        const year = date.getFullYear().toString().slice(-2);
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        return `${year}/${month}/${day}`;
    };


    return (
        <Popup open={popupOpen} closeOnDocumentClick={false}>
            <div className="createTaskOverlay">
                <div className="borderCreateTask">
                    <button className="backButton" onClick={popupClose}>
                        <IoArrowBackOutline className="backIcon" />
                    </button>
                    <form>
                        <p className="pageTitle">Create Task</p>
                        <p className="inputTitle">Type Description</p>
                        <textarea
                            className="inputTextArea"
                            onChange={handleDescriptionChange}
                            value={task_description}
                        />
                        <p className="inputTitle">Assignee</p>
                        <Select  //Dropdown
                            options={users.email}
                            value={user_id}
                            className="createTaskAssigneeDropdown"
                            name="createTaskAssigneeDropdown"
                            placeholder={"Add Assignees"}
                            onChange={handleSelect}
                            isSearchable={true}
                            isMulti
                        />
                        <p className="inputTitle">Completion Date</p>
                        <input
                            type="date"
                            className="textboxInput"
                            onChange={(e) => handleDateChange(e.target.value)}
                            required
                        />
                        <div className="createTaskButtonDiv">
                            <button className="createTaskSubmitButton" type="submit" onClick={handleClick}>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Popup>
    );
};
