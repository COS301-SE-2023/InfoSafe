import Popup from 'reactjs-popup';
import React, { useEffect, useState } from 'react';
import '../../styling/UpdateTask.css';
import { IoArrowBackOutline } from 'react-icons/io5';
import Dropdown from 'react-dropdown';
import Select from "react-select";
import ViewDataScope from "../View/ViewDataScope";
import { customStyles } from "../CustomStyling";

const TASK_ID = ['TASK 1', 'TASK 2', 'TASK 3'];
const USER_LIST = ['USER A', 'USER B', 'USER C', 'USER D'];

const statusOptions = [
    { value: 'High', label: 'High' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Low', label: 'Low' },
];

export const UpdateTask = ({ task, popupClose, popupOpen, onTaskEdited }) => {
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [currentUsers, setCurrentUsers] = useState([]);
    const [addUsers, setAddUsers] = useState([]);
    const [values, setValues] = useState({
        task_id: '',
        task_name: '',
        date_created: '',
        due_date: '',
        task_description: '',
        task_status: '',
        data_scope_id: '',
        daysUntilDue: ''
    });
    let finalUsers = [];

    useEffect(() => {
        fetch("https://infosafe.live/api/task/getUsersOfTask/" + task.task_id, {
            method: "GET",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            }
        })
            .then((res) => res.json())
            .then((result) => {
                setCurrentUsers(result)
                setAddUsers(result)
            })
            .catch((error) => {
                console.error("Error fetching current users:", error);
            });
    }, [task]);

    useEffect(() => {
        if (task) {
            setValues({
                task_id: task.task_id,
                task_name: task.task_name,
                date_created: task.date_created,
                due_date: task.due_date,
                task_description: task.task_description,
                task_status: task.task_status,
                data_scope_id: task.data_scope_id.data_scope_id,
                daysUntilDue: task.daysUntilDue
            });
        }
    }, [task]);

    useEffect(() => {
        fetch("https://infosafe.live/api/user/findUsersNotInTask/" + task.task_id, {
            method: "GET",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            }
        })
            .then((res) => res.json())
            .then((result) => {
                setUsers(result);
            })
            .catch((error) => {
                console.error("Error fetching users not in task:", error);
            });
    }, []);

    const HandleSubmit = async (e) => {
        e.preventDefault();
        popupClose();
        let finalUsers = [...addUsers, ...selectedUsers];
        const requestBody = {
            ...values,
            users_email: finalUsers
        };
        fetch("https://infosafe.live/api/task/update/" + task.task_id, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + sessionStorage.getItem("accessToken")
            },
            body: JSON.stringify(requestBody)
        })
            .then(response => {
                if (response.ok) {
                    console.log("Updated Task");
                    onTaskEdited();
                } else {
                    throw new Error("Network response was not ok");
                }
            })
            .catch(error => {
                console.error("Error updating task:", error);
            });
    }

    const handleSelect = (selectedOptions) => {
        const selectedEmails = selectedOptions.map((option) => option.label);
        setSelectedUsers(selectedEmails);
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
                                onChange={e => setValues({ ...values, task_name: e.target.value })}
                            />
                            <p className="viewTaskDisplayTitle">Data Scope</p>
                            <textarea
                                className="editTaskInputTextArea"
                                defaultValue={task.data_scope_id.ds_name}
                                // onChange={e => setValues({...values, dataScope_id: e.target.value})}
                                readOnly={true}
                            />
                            {/*<p className="viewTaskDisplayData">{task.data_scope_id.ds_name}</p>*/}
                            <p className="editTaskLabel">Task Description</p>
                            <textarea
                                className="editTaskDescriptionInput"
                                defaultValue={task.task_description}
                                onChange={e => setValues({ ...values, task_description: e.target.value })}
                            />
                            <p className="editTaskLabels">Assigned Users:</p>
                            {currentUsers && currentUsers.length > 0 ? (
                                <Select
                                    options={currentUsers.map((email) => ({ value: email, label: email }))}
                                    value={currentUsers.length > 0 ? [{ value: currentUsers[0], label: currentUsers[0] }] : null}
                                    placeholder={currentUsers[0]}
                                    className="editTaskAssignees"
                                    name="editTaskAssignees"
                                    styles={customStyles}
                                />
                            ) : (
                                <p className="editTaskLoading">Loading...</p>
                            )}
                            <p className="editTaskLabels">Add More Assignees</p>
                            {users && users.length > 0 ? (
                                <Select
                                    options={users.map((email) => ({ value: email, label: email }))}
                                    value={selectedUsers.map((email) => ({ label: email }))}
                                    className="editTaskAssignees"
                                    name="editTaskAssignees"
                                    placeholder={"Add Assignees"}
                                    onChange={handleSelect}
                                    isSearchable={true}
                                    styles={customStyles}
                                    isMulti
                                />
                            ) : (
                                <p className="editTaskLoading">Loading...</p>
                            )}
                            <p className="editTaskLabels">Status</p>
                            <Dropdown
                                options={statusOptions}
                                value={statusOptions.find((option) => option.value === task.task_status)}
                                className="editTaskStatusDropdown"
                                name="editTaskStatusDropdown"
                                placeholder={"Select Status"}
                                onChange={(selectedOption) => setValues({ ...values, task_status: selectedOption.value })}
                            />
                            <p className="editTaskLabels">Completion Date</p>
                            <input
                                type="date"
                                className="updateTaskDateInput"
                                defaultValue={task.due_date}
                                onChange={(e) => setValues({ ...values, due_date: e.target.value })}
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
