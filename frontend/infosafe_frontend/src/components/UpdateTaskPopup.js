import Popup from 'reactjs-popup';
import React from 'react';
import '../styling/UpdateTask.css';
import { IoArrowBackOutline } from 'react-icons/io5';
import Dropdown from 'react-dropdown';
/* eslint-disable react/prop-types */
/* eslint-disable  no-unused-vars */
const TASK_ID = ['TASK 1', 'TASK 2', 'TASK 3'];
const USER_LIST = ['USER A', 'USER B', 'USER C', 'USER D'];
export const UpdateTask = ({ popupClose, popupOpen }) => {
    return (
        <Popup open={popupOpen} closeOnDocumentClick={false}>
            <div className="updateTaskOverlay">
                <div className="borderUpdateTask">
                    <button className="backButton" onClick={popupClose}>
                        <IoArrowBackOutline className="backIcon" />
                    </button>
                    <form>
                        <p className="pageTitle">Update Task</p>
                        <p className="inputTitle">Task ID</p>
                        <Dropdown
                            options={TASK_ID}
                            value={TASK_ID[0]}
                            className="updateTaskIDDropdown"
                            name="updateTaskIDDropdown"
                        />
                        <p className="inputTitle">Assignee</p>
                        <Dropdown
                            options={USER_LIST}
                            value={USER_LIST[0]}
                            className="updateTaskAssigneeDropdown"
                            name="updateTaskAssigneeDropdown"
                        />
                        <p className="inputTitle">Task Description</p>
                        <textarea className="inputTextArea" />
                        <p className="inputTitle">Completion Date</p>
                        <input
                            className="textboxInput"
                            type="text"
                            id="inputTextArea"
                            name="completionDate"
                        />
                        <div className="updateTaskButtonDiv">
                            <button className="updateTaskSubmitButton" type="submit" onClick={popupClose}>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Popup>
    );
};
