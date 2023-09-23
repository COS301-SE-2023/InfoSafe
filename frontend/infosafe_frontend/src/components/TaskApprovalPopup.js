import Popup from 'reactjs-popup';
import React from 'react';
import '../styling/TaskApproval.css';
import { IoArrowBackOutline } from 'react-icons/io5';
/* eslint-disable react/prop-types */
/* eslint-disable  no-unused-vars */
const TASK_ID = ['TASK 1', 'TASK 2', 'TASK 3','TASK 4','TASK 5'];
export const TaskApproval = ({ popupClose, popupOpen }) => {
    return (
        <Popup open={popupOpen} closeOnDocumentClick={false}>
            <div className="taskApprovalOverlay">
                <div className="popupBackground">
                <div className="borderTaskApproval">
                    <button className="approveTaskBackButton" onClick={popupClose}>
                        <IoArrowBackOutline className="approveTaskBackIcon" />
                    </button>
                    <form>
                        <p className="approveTaskPageTitle">Task Approval</p>
                        <div className="approveTaskContent">
                        <p className="approveTaskDisplayTitle">Task ID</p>
                        <p className="approveTaskDisplayData">Task 1234</p>
                        <p className="approveTaskDisplayTitle">Data Scope</p>
                        <p className="approveTaskDisplayData">Data Scope A</p>
                        <p className="approveTaskDisplayTitle">Assigned User</p>
                        <p className="approveTaskDisplayData">User 12</p>
                        <p className="approveTaskDisplayTitle">Task Description</p>
                        <textarea className="approveTaskViewTextArea" readOnly={true} value="Example of a task description."/>
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