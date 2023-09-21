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
                <div className="borderTaskApproval">
                    <button className="backButton" onClick={popupClose}>
                        <IoArrowBackOutline className="backIcon" />
                    </button>
                    <form>
                        <p className="pageTitle">Task Approval</p>
                        <p className="inputTitle">Task ID</p>
                        <p className="displayData">Task 1234</p>
                        <p className="displayTitle">Data Scope</p>
                        <p className="displayData">Data Scope A</p>
                        <p className="displayTitle">Assigned User</p>
                        <p className="displayData">User 12</p>
                        <p className="displayTitle">Task Description</p>
                        <textarea className="viewTextArea" readOnly={true} value="Example of a task description."/>
                        <div className="taskApprovalButtonsDiv">
                            <button className="approveButton" type="submit" onClick={popupClose}>
                                Accept
                            </button>
                            <button className="rejectButton" type="submit" onClick={popupClose}>
                                Reject
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Popup>
    );
};