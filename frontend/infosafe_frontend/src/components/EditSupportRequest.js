import React from 'react';
import '../styling/EditSupportRequest.css';
import Popup from 'reactjs-popup';
import { IoArrowBackOutline } from 'react-icons/io5';
/* eslint-disable react/prop-types */
/* eslint-disable  no-unused-vars */

const EditSupportRequest = ({ popupOpen, popupClose }) => {
    return (
        <Popup open={popupOpen} closeOnDocumentClick={false} position="center center">
            <div className="editSupportRequestPopup">
                <div className="editSupportRequestPopupBorder">
                    <button className="editSupportRequestBackButton" onClick={popupClose}>
                        <IoArrowBackOutline className="editSupportRequestBackIcon" />
                    </button>
                    <p className="editSupportRequestTitle">Edit Support Request</p>
                    <div className="editSupportRequestTypeDiv">
                        <p className="editSupportRequestTypeLabel">Type of Support Request</p>
                        <p className="editSupportRequestTypeDisplay">Microsoft Account</p>
                    </div>
                    <div className="editSupportRequestUserDiv">
                        <p className="editSupportRequestUserLabel">User</p>
                        <p className="editSupportRequestTypeDisplay">User A</p>
                    </div>
                    <div className="editSupportRequestDescriptionDiv">
                        <p className="editSupportRequestDescriptionLabel">Description</p>
                        <textarea
                            className="editSupportRequestDescriptionDisplay"
                            readOnly={true}
                            defaultValue={'Insert description here'}
                        ></textarea>
                    </div>
                    <div className="editSupportRequestStatusDiv">
                        <p className="editSupportRequestStatusLabel">Current Status</p>
                        <p className="editSupportRequestStatusDisplay">Logged</p>
                    </div>
                    <div className="editSupportRequestButtonsDiv">
                        <button
                            className="updateSupportRequestStatusButton"
                            onClick={() => console.log('Update Support Request Status')}
                        >
                            Update Status
                        </button>
                    </div>
                </div>
            </div>
        </Popup>
    );
};

export default EditSupportRequest;
