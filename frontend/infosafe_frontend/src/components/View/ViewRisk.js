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
                <div className="popupBackground">
                    <div className="borderViewRisk">
                        <button className="viewRiskBackButton" onClick={popupClose} data-testid="back-button">
                            <IoArrowBackOutline className="viewRiskBackIcon" />
                        </button>
                        <p className="pageTitle">View Risk</p>
                        <p className="viewRiskPageTitle">Risk Name</p>
                        <p className="viewRiskDisplayData">{risk.risk_name}</p>
                        <p className="viewRiskPageTitle">Risk ID</p>
                        <p className="viewRiskDisplayData">{risk.risk_id}</p>
                        <p className="viewRiskPageTitle">Data Scope</p>
                        <p className="viewRiskDisplayData">{risk.dataScope.ds_name}</p>
                        <p className="viewRiskPageTitle">Probability</p>
                        <p className="viewRiskDisplayData">{risk.probability_rating}</p>
                        <p className="viewRiskPageTitle">Impact</p>
                        <p className="viewRiskDisplayData">{risk.impact_rating}</p>
                        <p className="viewRiskPageTitle">Vulnerability/Threat</p>
                        <textarea className="viewRiskTextArea" readOnly={true} value={risk.risk_description}/>
                    </div>
                </div>

            </div>
        </Popup>
    );
};

export default ViewRisk;
