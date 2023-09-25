import Popup from 'reactjs-popup';
import React from 'react';
import '../../styling/ReviewRisk.css';
import { IoArrowBackOutline } from 'react-icons/io5';
import Dropdown from 'react-dropdown';
/* eslint-disable react/prop-types */
/* eslint-disable  no-unused-vars */
const PROBABILITY = ['Almost Certain', 'Likely', 'Moderate','Unlikely','Rare'];
const IMPACT = ['Insignificant','Minor','Significant','Major','Severe'];
const STATUS = ['Accept','Avoid','Transfer','Mitigate'];
export const ReviewRisk = ({ risk, popupClose, popupOpen }) => {
    return (
        <Popup open={popupOpen} closeOnDocumentClick={false}>
            <div className="reviewRiskOverlay">
                <div className="popupBackground">
                    <div className="borderReviewRisk">
                        <button className="reviewRiskBackButton" onClick={popupClose}>
                            <IoArrowBackOutline className="reviewRiskBackIcon" />
                        </button>
                        <form>
                            <p className="pageTitle">Review Risk</p>
                            <p className="reviewRiskLabels">Data Scope</p>
                            <p className="reviewRiskDisplayData">{risk.dataScope.ds_name}</p>
                            <p className="reviewRiskLabels">Probability</p>
                            <Dropdown
                                options={PROBABILITY}
                                value={risk.probability_rating}
                                className="reviewRiskProbabilityDropdown"
                                name="reviewRiskProbabilityDropdown"
                            />
                            <p className="reviewRiskLabels">Impact</p>
                            <Dropdown
                                options={IMPACT}
                                value={risk.impact_rating}
                                className="reviewRiskImpactDropdown"
                                name="reviewRiskImpactDropdown"
                            />
                            <p className="reviewRiskLabels">Vulnerability/Threat</p>
                            <textarea className="reviewRiskTextArea">{risk.risk_description}</textarea>
                            <p className="reviewRiskLabels">Status</p>
                            <Dropdown
                                options={STATUS}
                                value={risk.risk_status}
                                className="reviewRiskStatusDropdown"
                                name="reviewRiskStatusDropdown"
                            />
                            <div>
                                <button className="reviewRiskSubmitButton" type="submit" onClick={popupClose}>
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </Popup>
    );
};