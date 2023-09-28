import Popup from 'reactjs-popup';
import React, {useEffect, useState} from 'react';
import '../../styling/CreateTask.css';
import {IoArrowBackOutline} from 'react-icons/io5';
import Dropdown from 'react-dropdown';
import Select from 'react-select';
import useRequestMaker from "../Subsystems/useRequestMaker";
import {useGetTask} from "../getData/getTask";
import {useAccessRequests} from "../RequestRequests/AccessRequestRequests";
import {customStyles} from "../CustomStyling";

export const CreateTask = ({popupClose, popupOpen, onTaskAdded}) => {
    const [task_description, setTaskDescription] = useState('');
    const [task_status, setTaskStatus] = useState('');
    const [due_date, setDueDate] = useState('');
    const [datascope, setDataScope] = useState(null);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [users, setUsers] = useState([]);
    const [task_name, setTask_name] = useState('');
    const {myDatascopeData} = useAccessRequests();
    const {showTask} = useGetTask()
    //const refresh = () => window.location.reload(true)

    const statusOptions = [
        {value: 'High', label: 'High'},
        {value: 'Medium', label: 'Medium'},
        {value: 'Low', label: 'Low'},
    ];
    const handleClick = (e) => {
        e.preventDefault();

        if ( task_description === '' || task_status === '' || due_date === ''|| datascope === null || selectedUsers === [] || task_name === '') {
            document.getElementById("createTaskError").style.display = "block";
            return;
        }


        const currentDate = new Date().toISOString().split('T')[0];
        const task = {
            task_name,
            task_description,
            task_status,
            due_date,
            date_created: currentDate,
            data_scope_id: datascope.value,
            users_email: selectedUsers.map((user) => user.label),
        };
        //console.log(task)
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
                onTaskAdded();
            })
            .catch((error) => {
                console.error("Error adding task:", error);

            });
        popupClose();
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
                <div className="popupBackground">
                <div className="borderCreateTask">
                    <button className="createTaskBackButton" onClick={popupClose} data-testid={"back-button"}>
                        <IoArrowBackOutline className="createTaskBackIcon"/>
                    </button>
                    <form>
                        <p className="createTaskPageTitle">Create Task</p>
                        <div className="createTaskContent">
                            <p className="createTaskInputTitle">Type Name</p>
                            <textarea
                                className="createTaskInputTextArea"
                                onChange={handleTaskNameChange}
                                value={task_name}
                                id="taskNameIn"
                            />
                            <p className="createTaskInputLabel">Type Description</p>
                            <textarea
                                className="createTaskDescriptionInputTextArea"
                                onChange={handleDescriptionChange}
                                value={task_description}
                                id="taskDescIn"
                            />
                            <p className="createTaskInputLabels">Task Status</p>
                            <Dropdown
                                options={statusOptions}
                                value={statusOptions.find((option) => option.value === task_status)}
                                className="createTaskStatusDropdown"
                                name="taskStatusDropdown"
                                placeholder={"Select Status"}
                                onChange={(selectedOption) => setTaskStatus(selectedOption.value)}
                                id="taskStatusIn"
                            />
                            <p className="createTaskInputLabels">Assignees</p>
                            {users && users.length > 0 ? (
                                <Select
                                    styles={customStyles}
                                    options={users.map((data) => ({value: data.user_id, label: data.email}))}
                                    value={selectedUsers}
                                    className="createTaskUserDropdown"
                                    name="datascopeDropdown"
                                    placeholder={"Add Assignees"}
                                    onChange={handleSelect}
                                    isSearchable={true}
                                    isMulti
                                    id="taskUserIn"
                                />
                            ) : (
                                <p className="createTaskLoadTitle">Loading...</p>
                            )}
                            <p className="createTaskInputLabels">Data Scope</p>
                            {myDatascopeData && myDatascopeData.length > 0 ? (
                                <Dropdown
                                    options={myDatascopeData.map((data) => ({value: data.data_scope_id, label: data.ds_name}))}
                                    value={myDatascopeData.ds_name}
                                    className="createTaskDataScopeDropdown"
                                    name="datascopeDropdown"
                                    placeholder={"Add DataScope"}
                                    onChange={(selectedOption) => setDataScope(selectedOption)}
                                />
                            ) : (
                                <p className="createTaskLoadTitle">Loading...</p>
                            )}
                            <p className="createTaskDateLabel">Completion Date</p>
                            <input
                                type="date"
                                className="createTaskDateInput"
                                onChange={(e) => handleDateChange(e.target.value)}
                                required
                                id="taskDateIn"
                            />
                            <p className="createTaskError" id="createTaskError">Please ensure all fields are completed.</p>
                            <button className="createTaskSubmitButton" type="submit" onClick={handleClick}>
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

export default CreateTask;
