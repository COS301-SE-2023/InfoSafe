import Popup from 'reactjs-popup';
import React, {useState} from 'react';
import '../../styling/UpdateTask.css';
import { IoArrowBackOutline } from 'react-icons/io5';
import Dropdown from 'react-dropdown';
import Select from "react-select";
/* eslint-disable react/prop-types */
/* eslint-disable  no-unused-vars */
const TASK_ID = ['TASK 1', 'TASK 2', 'TASK 3'];
const USER_LIST = ['USER A', 'USER B', 'USER C', 'USER D'];
export const UpdateTask = ({ task, popupClose, popupOpen }) => {
    const [users, setUsers] = useState('');
    const [selectedUsers, setSelectedUsers] = useState('');
    const[values, setValues]=useState({
        task_id: task.task_id,
        task_name: task.task_name,
        date_created: task.date_created,
        due_date: task.due_date,
        task_description: task.task_description,
        task_status: task.task_status
    })

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

    return (
        <Popup task={task} open={popupOpen} closeOnDocumentClick={false}>
            <div className="updateTaskOverlay">
                <div className="borderUpdateTask">
                    <button className="backButton" onClick={popupClose}>
                        <IoArrowBackOutline className="backIcon" />
                    </button>
                    <form>
                        <p className="pageTitle">Update Task</p>
                        <p className="inputTitle">Task Name</p>
                        <textarea
                            className="displayData"
                            defaultValue={task.task_name}
                            onChange={e => setValues({...values, task_name: e.target.value})}
                        />
                        <p className="inputTitle">Task Description</p>
                        <textarea
                            className="inputTextArea"
                            defaultValue={task.task_description}
                            onChange={e => setValues({...values, task_description: e.target.value})}
                        />
                        <p className="inputTitle">Assignees</p>
                        {/*Still unsure about this*/}
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
                        <p className="inputTitle">Status</p>
                        <input
                            className="updateTaskStatusInput"
                            defaultValue={task.task_status}
                            onChange={(e) => setValues({...values, task_status: e.target.value})}
                            required
                        />
                        <p className="inputTitle">Completion Date</p>
                        <input
                            type="date"
                            className="updateTaskDateInput"
                            defaultValue={task.due_date}
                            onChange={(e) => setValues({...values, due_date: e.target.value})}
                            required
                        />
                        <div className="updateTaskButtonDiv">
                            <button className="updateTaskSubmitButton" type="submit">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Popup>
    );
};
