import Popup from 'reactjs-popup';
import React, {useEffect, useState} from 'react';
import '../../styling/CreateTask.css';
import {IoArrowBackOutline} from 'react-icons/io5';
import Dropdown from 'react-dropdown';
import Select from 'react-select';
import useRequestMaker from "./useRequestMaker";

export const CreateTask = ({popupClose, popupOpen}) => {
    const [task_description, setTaskDescription] = useState('');
    const [task_status, setTaskStatus] = useState('');
    const [due_date, setDueDate] = useState('');
    const [datascope, setDataScope] = useState(null);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [users, setUsers] = useState([]);
    const [task_name, setTask_name] = useState('');
    const {datascopeData, setDsId} = useRequestMaker();

    const statusOptions = [
        {value: 'High', label: 'High'},
        {value: 'Medium', label: 'Medium'},
        {value: 'Low', label: 'Low'},
    ];
    const handleClick = (e) => {
        e.preventDefault();
        const task = {
            task_name,
            task_description,
            task_status,
            dataScope,
            due_date,
            date_created: currentDate,
            dataScope_id: datascope.value,
            users_email: selectedUsers.map((user) => user.label),
        };
        fetch("http://ec2-174-129-77-195.compute-1.amazonaws.com:8080/api/task/addTask", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
            },
            body: JSON.stringify(task),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("New task added");
                popupClose();
            })
            .catch((error) => {
                console.error("Error adding task:", error);
            });
    };

    useEffect(() => {
        fetch("http://ec2-174-129-77-195.compute-1.amazonaws.com:8080/api/user/getAll", {
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
    const handleSelect = (selectedOptions) => {
        setSelectedUsers(selectedOptions);
    };
    const handleDateChange = (date) => {
        setDueDate(date);
    };

    const handleDescriptionChange = (e) => {
        setTaskDescription(e.target.value);
    };

    const handleTaskNameChange = (e) => {
        setTask_name(e.target.value);
    };

    return (
        <Popup open={popupOpen} closeOnDocumentClick={false}>
            <div className="createTaskOverlay">
                <div className="borderCreateTask">
                    <button className="backButton" onClick={popupClose}>
                        <IoArrowBackOutline className="backIcon"/>
                    </button>
                    <form>
                        <p className="pageTitle">Create Task</p>
                        <p className="inputTitle">Type name</p>
                        <textarea
                            className="inputTextArea"
                            onChange={handleTaskNameChange}
                            value={task_name}
                        />
                        <p className="inputTitle">Type Description</p>
                        <textarea
                            className="inputTextArea"
                            onChange={handleDescriptionChange}
                            value={task_description}
                        />
                        <p className="inputTitle">Task Status</p>
                        <Select
                            options={statusOptions}
                            value={statusOptions.find((option) => option.value === task_status)}
                            className="datascopeDropdown"
                            name="taskStatusDropdown"
                            placeholder={"Select Status"}
                            onChange={(selectedOption) => setTaskStatus(selectedOption.value)}
                        />
                        <p className="inputTitle">Assignees</p>
                        {users && users.length > 0 ? (
                            <Select
                                options={users.map((data) => ({value: data.user_id, label: data.email}))}
                                value={selectedUsers}
                                className="datascopeDropdown"
                                name="datascopeDropdown"
                                placeholder={"Add Assignees"}
                                onChange={handleSelect}
                                isSearchable={true}
                                isMulti
                            />
                        ) : (
                            <p>Loading...</p>
                        )}
                        <p className="createAccessRequestDataScopeLabel">Data Scope</p>
                        {datascopeData && datascopeData.length > 0 ? (
                            <Select
                                options={datascopeData.map((data) => ({value: data.data_scope_id, label: data.ds_name}))}
                                value={datascope}
                                className="accessRequestDatascopeDropdown"
                                name="datascopeDropdown"
                                placeholder={"Add DataScope"}
                                onChange={(selectedOption) => setDataScope(selectedOption)}
                            />
                        ) : (
                            <p className="loadTitle">Loading...</p>
                        )}
                        <p className="inputTitle">Completion Date</p>
                        <input
                            type="date"
                            className="createAssetRequestDateInput"
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
