import Popup from 'reactjs-popup';
import React, {useEffect, useState} from 'react';
import '../../styling/UpdateTask.css';
import { IoArrowBackOutline } from 'react-icons/io5';
import Dropdown from 'react-dropdown';
import Select from "react-select";
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
    const [users, setUsers] = useState('');
    const [selectedUsers, setSelectedUsers] = useState('');
    const[values, setValues]=useState({
        task_id: '',
        task_name: '',
        date_created: '',
        due_date: '',
        task_description: '',
        task_status: ''
    });

    useEffect(() => {
        if (task) {
            setValues({
                task_id: task.task_id,
                task_name: task.task_name,
                date_created: task.date_created,
                due_date: task.due_date,
                task_description: task.task_description,
                task_status: task.task_status
            });
        }
    }, [task]);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values)
        fetch('http://localhost:8080/api/task/update/' + task.task_id, {
            method:"PUT",
            headers:{"Content-Type":"application/json",
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            },
            body:JSON.stringify(values)
        }).then(()=>{
            console.log("Updated Task")
        })
        //console.log(JSON.stringify(values))
        popupClose()
    }

    const handleSelect = (selectedOptions) => {
        setSelectedUsers(selectedOptions);
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
        <Popup task={task} open={popupOpen} closeOnDocumentClick={false}>
            <div className="updateTaskOverlay">
                <div className="popupBackground">
                    <div className="borderUpdateTask">
                        <button className="editTaskBackButton" onClick={popupClose}>
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
                            <p className="editTaskLabels">Assignees</p>
                            {/*Still unsure about this*/}
                            {users && users.length > 0 ? (
                                <Select  //Dropdown
                                    options={users.map((data) => ({value: data.user_id, label: data.email}))}
                                    value = {selectedUsers}
                                    className="editTaskAssignees"
                                    name="editTaskAssignees"
                                    placeholder={"Add Assignees"}
                                    onChange={handleSelect}
                                    isSearchable={true}
                                    // isMulti
                                    styles={customStyles}
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
                                <button className="updateTaskSubmitButton" type="submit" onClick={handleSubmit}>
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
