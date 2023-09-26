import Popup from 'reactjs-popup';
import React, {useEffect, useState} from 'react';
import '../../styling/CreateTask.css';
import {IoArrowBackOutline} from 'react-icons/io5';
import Dropdown from 'react-dropdown';
import Select from 'react-select';
import useRequestMaker from "../Subsystems/useRequestMaker";
import {useGetTask} from "../getData/getTask";

export const CreateTask = ({popupClose, popupOpen}) => {
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
            dataScope_id: datascope.value,
            users_email: selectedUsers.map((user) => user.label),
        };
        console.log(task)
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
                console.log("New task added");
                popupClose();
            })
            .catch((error) => {
                console.error("Error adding task:", error);
            });
        //refresh();
        popupClose();
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

    const customStyles = {
        control: (base, state) => ({
            ...base,
            background: "#CECECE",
            // match with the menu
            borderRadius: state.isFocused ? "2px 2px 0 0" : 3,
            // Removes weird border around container
            boxShadow: state.isFocused ? null : null,
            width: "70%",
            color: 'black',
            borderColor: state.isFocused ? "grey" : "transparent",
            '&:hover': { borderColor: 'grey' }
        }),
        menu: base => ({
            ...base,
            // override border radius to match the box
            borderRadius: 0,
            // kill the gap
            marginTop: 0,
            width: "70%",
        }),
        menuList: base => ({
            ...base,
            // kill the white space on first and last option
            padding: 0

        }),
        dropdownIndicator: base => ({
            ...base,
            color: '#999',
        }),
        placeholder: base => ({
            ...base,
            color: 'black'
        }),
        multiValue: base => ({
            ...base,
            background: "white",
            color: 'black'
        })
    };

    return (
        <Popup open={popupOpen} closeOnDocumentClick={false}>
            <div className="createTaskOverlay">
                <div className="popupBackground">
                <div className="borderCreateTask">
                    <button className="createTaskBackButton" onClick={popupClose}>
                        <IoArrowBackOutline className="createTaskBackIcon"/>
                    </button>
                    <form>
                        <p className="createTaskPageTitle">Create Task</p>
                        <div className="createTaskContent">
                            <p className="createTaskInputTitle">Type name</p>
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
                                <p>Loading...</p>
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
                                <p className="loadTitle">Loading...</p>
                            )}
                            <p className="createTaskInputLabels">Completion Date</p>
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