import Popup from 'reactjs-popup';
import React from 'react';
import '../styling/TaskApproval.css';
import { IoArrowBackOutline } from 'react-icons/io5';
import Select from "react-select";
/* eslint-disable react/prop-types */
/* eslint-disable  no-unused-vars */
const TASK_ID = ['TASK 1', 'TASK 2', 'TASK 3','TASK 4','TASK 5'];
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
                        <p className="approveTaskDisplayData">
                            {/*{users && users.length > 0 ? (*/}
                            {/*    <Select*/}
                            {/*        options={users.map((data) => ({ value: data.user_id, label: data.email }))}*/}
                            {/*        value={selectedUsers}*/}
                            {/*        className="datascopeDropdown"*/}
                            {/*        name="datascopeDropdown"*/}
                            {/*        placeholder={"Add Assignees"}*/}
                            {/*        onChange={handleSelect}*/}
                            {/*        isSearchable={true}*/}
                            {/*    />*/}
                            {/*) : (*/}
                            {/*    <p>Loading...</p>*/}
                            {/*)}*/}
                        </p>
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