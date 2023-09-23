import Popup from 'reactjs-popup';
import React from 'react';
import '../../styling/ViewAccessRequest.css';
import { IoArrowBackOutline } from 'react-icons/io5';
/* eslint-disable react/prop-types */
/* eslint-disable  no-unused-vars */

const ViewAccessRequest = ({ popupClose, popupOpen }) => {
    return (
        <Popup open={popupOpen} closeOnDocumentClick={false} position="center center">
            <div className="viewAccessRequestPopup">
                <div className="popupBackground">
                <div className="viewAccessRequestPopupBorder">
                    <button className="viewAccessRequestBackButton" onClick={popupClose} data-testid="back-button">
                        <IoArrowBackOutline className="viewAccessRequestBackIcon" />
                    </button>
                    <p className="viewAccessRequestTitle">View Access Request</p>
                    <div className="viewAccessRequestContent">

                        <p className="viewAccessRequestDatascopeLabel">Data Scope</p>
                        <p className="viewAccessRequestDatascopeNameDisplay">Data Scope 9</p>


                        <p className="viewAccessRequestRoleLabel">Role</p>
                        <p className="viewAccessRequestRoleDisplay">ISO</p>


                        <p className="viewAccessRequestReasonLabel">Reason</p>
                        <textarea
                            readOnly={true}
                            className="viewAccessRequestReasonDisplay"
                            defaultValue="Insert reason here."
                        ></textarea>

                        <p className="viewAccessRequestStatusLabel">Status</p>
                        <p className="viewAccessRequestStatusDisplay">Approved</p>
                    </div>
                </div>
            </div>
            </div>
        </Popup>
    );
};
export default ViewAccessRequest;
