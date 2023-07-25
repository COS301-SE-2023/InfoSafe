import Popup from 'reactjs-popup';
import React from 'react';
import '../styling/ViewTask.css';
import { IoArrowBackOutline } from 'react-icons/io5';
/* eslint-disable react/prop-types */
/* eslint-disable  no-unused-vars */
export const ViewTask = ({ popupClose, popupOpen }) => {
    return (
        <Popup open={popupOpen} closeOnDocumentClick={false}>
            <div className="viewTaskOverlay">
                <div className="borderViewTask">
                    <button className="backButton" onClick={popupClose}>
                        <IoArrowBackOutline className="backIcon" />
                    </button>
                    <p className="pageTitle">View Task</p>
                    <p className="displayTitle">Task ID</p>
                    <p className="displayData">Task 123</p>
                    <p className="displayTitle">Data Scope</p>
                    <p className="displayData">Data Scope A</p>
                    <p className="displayTitle">Task Description</p>
                    <textarea className="viewTextArea" readOnly={true} value=" Example of a task description.{' '}"/>
                    <p className="displayTitle">Completion Date</p>
                    <p className="displayData">12/12/2012</p>
                </div>
            </div>
        </Popup>
    );
};
