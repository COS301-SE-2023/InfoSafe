import Popup from 'reactjs-popup';
import React, {useEffect, useState} from 'react';
import '../../styling/CreateTask.css';
import { IoArrowBackOutline } from 'react-icons/io5';
import Dropdown from 'react-dropdown';
import Select from 'react-select';

export const CreateTask = ({ popupClose, popupOpen }) => {
    const [task_description, setTaskDescription] = useState('');
    const [task_status, setTaskStatus] = useState('');
    const [due_date, setDueDate] = useState('');
    const [date_created, setDateCreated] = useState('');
    const [user_id, setUserId] = useState([]);
    const [task_id, setTaskId] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [users, setUsers] = useState([]);

    const handleDescriptionChange = (e) => {
        setTaskDescription(e.target.value);
    };
    const handleClick = (e) => {
        e.preventDefault();
        let use_id;
        const task = { task_description, task_status, due_date, date_created };
        fetch("http://localhost:8080/api/task/addTask", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
            },
            body: JSON.stringify(task),
        })
            .then((response) => response.json())
            .then((data) => {
                setTaskId(data.task_id); // Save the task_id from the API response
                console.log("New task added");
                console.log(data.task_id);

                if (selectedUsers.length > 0) {
                    const assignedTasks = selectedUsers.map((user) => ({
                        task_id: data.task_id, // Use the task_id from the API response
                        user_id: user.value,
                    }));

                    Promise.all(
                        assignedTasks.map((assignedtask) =>
                            fetch("http://localhost:8080/api/assignedTask/addTask", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
                                },
                                body: JSON.stringify(assignedtask),
                            })
                        )
                    ).then(() => {
                        console.log("New Assignedtasks added");
                        popupClose();
                    });
                } else {
                    popupClose();
                }
            })
            .catch((error) => {
                console.error("Error adding task:", error);
            });
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
    const handleSelect = (selectedOptions) => {
        setSelectedUsers(selectedOptions);
    };
    const handleDateChange = (date) => {
        setDateCreated(date);
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
                        <p className="inputTitle">Assignees</p>
                        {users && users.length > 0 ? (
                        <Select  //Dropdown
                            options={users.map((data) => ({value: data.user_id, label: data.email}))}
                            value = {selectedUsers}
                            className="datascopeDropdown"
                            name="datascopeDropdown"
                            placeholder={"Add Assignees"}
                            onChange={handleSelect}
                            isSearchable={true}
                            isMulti
                        /> ) : (
                            <p>Loading...</p>
                        )}
                        <p className="inputTitle">Completion Date</p>
                        <input
                            type="date"
                            className="createTaskDateInput"
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
