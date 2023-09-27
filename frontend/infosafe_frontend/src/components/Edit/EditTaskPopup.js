import Popup from 'reactjs-popup';
import React, {useEffect, useState} from 'react';
import '../../styling/UpdateTask.css';
import { IoArrowBackOutline } from 'react-icons/io5';
import Dropdown from 'react-dropdown';
import Select from "react-select";
import ViewDataScope from "../View/ViewDataScope";
import {customStyles} from "../CustomStyling";
/* eslint-disable react/prop-types */
/* eslint-disable  no-unused-vars */
const TASK_ID = ['TASK 1', 'TASK 2', 'TASK 3'];
const USER_LIST = ['USER A', 'USER B', 'USER C', 'USER D'];

const statusOptions = [
    {value: 'High', label: 'High'},
    {value: 'Medium', label: 'Medium'},
    {value: 'Low', label: 'Low'},
];
export const UpdateTask = ({ task, popupClose, popupOpen }) => {
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
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
    let finalUsers = [];

    useEffect(() => {
        fetch("http://localhost:8080/api/task/getUsersOfTask/" + task.task_id, {
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
        console.log(task)
        if (task) {
            setValues({
                task_id: task.task_id,
                task_name: task.task_name,
                date_created: task.date_created,
                due_date: task.due_date,
                task_description: task.task_description,
                task_status: task.task_status,
                dataScope_id: task.dataScope.data_scope_id,
                daysUntilDue: task.daysUntilDue
            });
        }
    },[task]);

    useEffect(() => {
        fetch("http://localhost:8080/api/user/findUsersNotInTask/" + task.task_id, {
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


    const HandleSubmit = async (e) => {
        e.preventDefault();
        let finalUsers = [...addUsers, ...selectedUsers];
        const requestBody = {
            ...values,
            users: finalUsers
        };
        fetch("http://localhost:8080/api/task/update/" + task.task_id, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + sessionStorage.getItem("accessToken")
            },
            body: JSON.stringify(requestBody)
        }).then(() => {
            console.log("Updated Task")
        })
        popupClose()
    }



    const handleSelect = (selectedOptions) => {
        const selectedEmails = selectedOptions.map((option) => option.label);
        setSelectedUsers(selectedEmails);
        console.log(selectedEmails);
    };

    return (
        <Popup task={task} open={popupOpen} closeOnDocumentClick={false}>
            <div className="updateTaskOverlay">
                <div className="popupBackground">
                    <div className="borderUpdateTask">
                        <button className="editTaskBackButton" onClick={popupClose} data-testid="back-button">
                            <IoArrowBackOutline className="editTaskBackIcon" />
                        </button>
                        <form>
                            <p className="editTaskPageTitle">Update Task</p>
                            <p className="editTaskInputTitle">Task Name</p>
                            <textarea
                                className="editTaskInputTextArea"
                                defaultValue={task.task_name}
                                onChange={e => setValues({...values, task_name: e.target.value})}
                            />
                            <p className="editTaskLabel">Task Description</p>
                            <textarea
                                className="editTaskDescriptionInput"
                                defaultValue={task.task_description}
                                onChange={e => setValues({...values, task_description: e.target.value})}
                            />
                            <p className="editTaskLabels">List of Users:</p>
                            {currentUsers && currentUsers.length > 0 ? (
                                <Select
                                    options={currentUsers.map((email) => ({value: email, label: email}))}
                                    placeholder={currentUsers[0]}
                                    className="editTaskAssignees"
                                    name="editTaskAssignees"
                                    styles={customStyles}
                                /> ) : (
                                <p>Loading...</p>
                            )}
                            <p className="editTaskLabels">Add More Assignees</p>
                            {users && users.length > 0 ? (
                                <Select
                                    options={users.map((data) => ({value: data.user_id, label: data.email}))}
                                    value={selectedUsers.map((email) => ({ label: email }))}
                                    className="editTaskAssignees"
                                    name="editTaskAssignees"
                                    placeholder={"Add Assignees"}
                                    onChange={handleSelect}
                                    isSearchable={true}
                                    styles={customStyles}
                                    isMulti
                                /> ) : (
                                <p>Loading...</p>
                            )}
                            <p className="editTaskLabels">Status</p>
                            <Dropdown
                                options={statusOptions}
                                value={statusOptions.find((option) => option.value === task.task_status)}
                                className="editTaskStatusDropdown"
                                name="editTaskStatusDropdown"
                                placeholder={"Select Status"}
                                onChange={(selectedOption) => setValues({...values, task_status: selectedOption.value})}
                            />
                            <p className="editTaskLabels">Completion Date</p>
                            <input
                                type="date"
                                className="updateTaskDateInput"
                                defaultValue={task.due_date}
                                onChange={(e) => setValues({...values, due_date: e.target.value})}
                                required
                            />
                            <div className="updateTaskButtonDiv">
                                <button className="updateTaskSubmitButton" type="submit" onClick={HandleSubmit}>
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Popup>
    );
};

export default UpdateTask;
