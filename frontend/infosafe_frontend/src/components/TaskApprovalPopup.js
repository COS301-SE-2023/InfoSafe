import Popup from 'reactjs-popup';
import React from 'react';
import '../styling/TaskApproval.css';
import { IoArrowBackOutline } from 'react-icons/io5';
import Select from "react-select";
/* eslint-disable react/prop-types */
/* eslint-disable  no-unused-vars */
const TASK_ID = ['TASK 1', 'TASK 2', 'TASK 3','TASK 4','TASK 5'];

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

export const TaskApproval = ({ task, popupClose, popupOpen }) => {
    return (
        <Popup task={task} open={popupOpen} closeOnDocumentClick={false}>
            <div className="taskApprovalOverlay">
                <div className="popupBackground">
                <div className="borderTaskApproval">
                    <button className="approveTaskBackButton" onClick={popupClose}>
                        <IoArrowBackOutline className="approveTaskBackIcon" />
                    </button>
                    <form>
                        <p className="approveTaskPageTitle">Task Approval</p>
                        <div className="approveTaskContent">
                        <p className="approveTaskDisplayTitle">Task Name</p>
                        <p className="approveTaskDisplayData">{task.task_name}</p>
                        <p className="approveTaskDisplayTitle">Data Scope</p>
                        <p className="approveTaskDisplayData">{task.dataScope.ds_name}</p>
                        <p className="approveTaskDisplayTitle">Assigned User</p>
                        {task.users && task.users.length > 0 ? (
                            <Select
                                styles={customStyles}
                                value={task.users.map((data) => ({ value: data.first_name, label: data.email }))}
                                className="approveTaskSelect"
                                name="datascopeDropdown"
                                placeholder={"Add Assignees"}
                                isSearchable={true}
                            />
                        ) : (
                            <p>Loading...</p>
                        )}
                        <p className="approveTaskDisplayTitle">Task Description</p>
                        <textarea className="approveTaskViewTextArea" readOnly={true} value={task.task_description}/>
                        <div className="taskApprovalButtonsDiv">
                            <button className="approveButton" type="submit" onClick={popupClose}>
                                Accept
                            </button>
                            <button className="rejectButton" type="submit" onClick={popupClose}>
                                Reject
                            </button>
                        </div>
                        </div>
                    </form>
                </div>
                </div>
            </div>
        </Popup>
    );
};