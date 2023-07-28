import Popup from 'reactjs-popup';
import React from 'react';
import '../../styling/CreateTask.css';
import { IoArrowBackOutline } from 'react-icons/io5';
import Dropdown from 'react-dropdown';
/* eslint-disable react/prop-types */
/* eslint-disable  no-unused-vars */
const TASK_TYPES = ['COMPLIANCE MATRIX', 'RISK', 'SUPPORT REQUEST'];
const DATA_SCOPES = ['DATA SCOPE 1', 'DATA SCOPE 2', 'DATA SCOPE 3', 'DATA SCOPE 4'];
const USER_LIST = ['USER A', 'USER B', 'USER C', 'USER D'];
export const CreateTask = ({ popupClose, popupOpen }) => {
    return (
        <Popup open={popupOpen} closeOnDocumentClick={false}>
            <div className="createTaskOverlay">
                <div className="borderCreateTask">
                    <button className="backButton" onClick={popupClose}>
                        <IoArrowBackOutline className="backIcon" />
                    </button>
                    <form>
                        <p className="pageTitle">Create Task</p>
                        <p className="inputTitle">Type</p>
                        <Dropdown
                            options={TASK_TYPES}
                            value={TASK_TYPES[1]}
                            className="createTaskTypeDropdown"
                            name="createTaskTypeDropdown"
                        />
                        <p className="inputTitle">Data Scope</p>
                        <Dropdown
                            options={DATA_SCOPES}
                            value={DATA_SCOPES[1]}
                            className="createTaskDataScopeDropdown"
                            name="createTaskDataScopeDropdown"
                        />
                        <p className="inputTitle">Assignee</p>
                        <Dropdown
                            options={USER_LIST}
                            value={USER_LIST[1]}
                            className="createTaskAssigneeDropdown"
                            name="createTaskAssigneeDropdown"
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
                        <div className="createTaskButtonDiv">
                            <button className="createTaskSubmitButton" type="submit" onClick={popupClose}>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Popup>
    );
};
