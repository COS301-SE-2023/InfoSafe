import Popup from 'reactjs-popup';
import React from 'react';
import '../styling/ViewRisk.css';
import { IoArrowBackOutline } from 'react-icons/io5';
/* eslint-disable react/prop-types */
/* eslint-disable  no-unused-vars */
export const ViewRisk = ({ popupClose, popupOpen }) => {
    return (
        <Popup open={popupOpen} closeOnDocumentClick={false}>
            <div className="viewRiskOverlay">
                <div className="borderViewRisk">
                    <button className="backButton" onClick={popupClose}>
                        <IoArrowBackOutline className="backIcon" />
                    </button>
                    <p className="pageTitle">View Risk</p>
                    <p className="displayTitle">Risk ID</p>
                    <p className="displayData">Risk 123</p>
                    <p className="displayTitle">Data Scope</p>
                    <p className="displayData">Data Scope A</p>
                    <p className="displayTitle">Probability</p>
                    <p className="displayData">Almost Certain</p>
                    <p className="displayTitle">Impact</p>
                    <p className="displayData">Insignificant</p>
                    <p className="displayTitle">Vulnerability</p>
                    <textarea className="viewTextArea" readOnly={true} value="example of vulnerability"/>
                    <p className="displayTitle">Threat</p>
                    <textarea className="viewTextArea" readOnly={true} value="example of threat"/>
                </div>
            </div>
        </Popup>
    );
};