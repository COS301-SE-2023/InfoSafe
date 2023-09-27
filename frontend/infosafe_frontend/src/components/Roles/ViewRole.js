import {IoArrowBackOutline} from "react-icons/io5";
import React from "react";
import Popup from "reactjs-popup";



export const ViewRole = ({role, popupClose, popupOpen}) => {
    return (
        <Popup open={popupOpen} closeOnDocumentClick={false}>
            <div className="viewRiskOverlay">
                <div className="popupBackground">
                    <div className="borderViewRisk">
                        <button className="viewRiskBackButton" onClick={popupClose} data-testid="back-button">
                            <IoArrowBackOutline className="viewRiskBackIcon" />
                        </button>
                        <p className="pageTitle">View Role</p>
                        <p className="viewRiskPageTitle">Role Name</p>
                        <p className="viewRiskDisplayData">{role.role_name}</p>
                    </div>
                </div>

            </div>
        </Popup>
    );
};

export default ViewRole;