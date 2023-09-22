import Popup from 'reactjs-popup';
import React from 'react';
import '../../styling/ViewRisk.css';
import { IoArrowBackOutline } from 'react-icons/io5';
import ViewDevice from "./ViewDevice";
/* eslint-disable react/prop-types */
/* eslint-disable  no-unused-vars */
export const ViewRisk = ({ risk, popupClose, popupOpen }) => {
    return (
        <Popup open={popupOpen} closeOnDocumentClick={false}>
            <div className="viewRiskOverlay">
                <div className="borderViewRisk">
                    <button className="backButton" onClick={popupClose} data-testid="back-button">
                        <IoArrowBackOutline className="backIcon" />
                    </button>
                    <p className="pageTitle">View Risk</p>
                    <p className="displayTitle">Risk ID</p>
                    <p className="displayData">{risk.risk_id}</p>
                    <p className="displayTitle">Probability</p>
                    <p className="displayData">{risk.probability_rating}</p>
                    <p className="displayTitle">Impact</p>
                    <p className="displayData">{risk.impact_rating}</p>
                    <p className="displayTitle">Vulnerability/Threat</p>
                    <textarea className="viewTextArea" readOnly={true} value={risk.risk_description}/>
                </div>
            </div>
        </Popup>
    );
};

export default ViewRisk;
