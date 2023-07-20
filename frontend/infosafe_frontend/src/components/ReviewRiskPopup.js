import Popup from 'reactjs-popup';
import React from 'react';
import '../styling/ReviewRisk.css';
import { IoArrowBackOutline } from 'react-icons/io5';
import Dropdown from 'react-dropdown';
/* eslint-disable react/prop-types */
/* eslint-disable  no-unused-vars */
const PROBABILITY = ['Almost Certain', 'Likely', 'Moderate','Unlikely','Rare'];
const IMPACT = ['Insignificant','Minor','Significant','Major','Severe'];
const STATUS = ['Accept','Avoid','Transfer','Mitigate'];
export const ReviewRisk = ({ popupClose, popupOpen }) => {
    return (
        <Popup open={popupOpen} closeOnDocumentClick={false}>
            <div className="reviewRiskOverlay">
                <div className="borderReviewRisk">
                    <button className="backButton" onClick={popupClose}>
                        <IoArrowBackOutline className="backIcon" />
                    </button>
                    <form>
                        <p className="pageTitle">Review Risk</p>
                        <p className="displayTitle">Data Scope</p>
                        <p className="displayData">Data Scope A</p>
                        <p className="inputTitle">Probability</p>
                        <Dropdown
                            options={PROBABILITY}
                            value={PROBABILITY[0]}
                            className="probabilityDropdown"
                            name="probabilityDropdown"
                        />
                        <p className="inputTitle">Impact</p>
                        <Dropdown
                            options={IMPACT}
                            value={IMPACT[0]}
                            className="impactDropdown"
                            name="impactDropdown"
                        />
                        <p className="inputTitle">Vulnerability</p>
                        <textarea className="inputTextArea" />
                        <p className="inputTitle">Threat</p>
                        <textarea className="inputTextArea" />
                        <p className="inputTitle">Status</p>
                        <Dropdown
                            options={STATUS}
                            value={STATUS[0]}
                            className="reviewRiskStatusDropdown"
                            name="reviewRiskStatusDropdown"
                        />
                        <div>
                            <button className="submitButton" type="submit" onClick={popupClose}>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Popup>
    );
};