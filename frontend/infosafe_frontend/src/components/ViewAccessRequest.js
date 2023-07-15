import Popup from 'reactjs-popup';
import React from 'react';
import '../styling/ViewAccessRequest.css';
import { IoArrowBackOutline } from 'react-icons/io5';
/* eslint-disable react/prop-types */
/* eslint-disable  no-unused-vars */

const ViewAccessRequest = ({ popupClose, popupOpen }) => {
    return (
        <Popup open={popupOpen} closeOnDocumentClick={false} position="center center">
            <div className="viewAccessRequestPopup">
                <div className="accessRequestPopupBorder">
                    <button className="viewAccessRequestBackButton" onClick={popupClose}>
                        <IoArrowBackOutline className="accessRequestBackIcon" />
                    </button>
                    <p className="viewAccessRequestTitle">View Access Request</p>
                    <div className="viewAccessRequestDatascopeDiv">
                        <p className="viewAccessRequestDatascopeLabel">Data Scope</p>
                        <p className="viewAccessRequestDatascopeNameDisplay">Data Scope 9</p>
                    </div>
                    <div className="viewAccessRequestRoleDiv">
                        <p className="viewAccessRequestRoleLabel">Role</p>
                        <p className="viewAccessRequestRoleDisplay">ISO</p>
                    </div>
                    <div className="viewAccessRequestReasonDiv">
                        <p className="viewAccessRequestReasonLabel">Reason</p>
                        <textarea
                            readOnly={true}
                            className="viewAccessRequestReasonDisplay"
                            defaultValue="Insert reason here."
                        ></textarea>
                    </div>
                    <div className="viewAccessRequestStatusDiv">
                        <p className="viewAccessRequestStatusLabel">Status</p>
                        <p className="viewAccessRequestStatusDisplay">Approved</p>
                    </div>
                </div>
            </div>
        </Popup>
    );
};
export default ViewAccessRequest;
