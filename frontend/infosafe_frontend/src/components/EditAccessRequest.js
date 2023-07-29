import Popup from 'reactjs-popup';
import React from 'react';
import '../styling/EditAccessRequest.css';
import { IoArrowBackOutline } from 'react-icons/io5';
/* eslint-disable react/prop-types */
/* eslint-disable  no-unused-vars */

const EditAccessRequest = ({ popupClose, popupOpen }) => {
    const ACCESSREQUESTSTATUSOPTIONS = ['LOGGED', 'APPROVED', 'REJECTED'];
    return (
        <Popup open={popupOpen} closeOnDocumentClick={false} position="center center">
            <div className="editAccessRequestPopup">
                <div className="editAccessRequestPopupBorder">
                    <button className="editAccessRequestBackButton" onClick={popupClose}>
                        <IoArrowBackOutline className="editAccessRequestBackIcon" />
                    </button>
                    <form>
                        <p className="editAccessRequestTitle">Edit Access Request</p>
                        <div className="editAccessRequestDatascopeDiv">
                            <p className="editAccessRequestDatascopeLabel">Data Scope</p>
                            <p className="editAccessRequestDatascopeNameDisplay">Data Scope 9</p>
                        </div>
                        <div className="editAccessRequestRoleDiv">
                            <p className="editAccessRequestRoleLabel">Role</p>
                            <p className="editAccessRequestRoleDisplay">ISO</p>
                        </div>
                        <div className="editAccessRequestReasonDiv">
                            <p className="editAccessRequestReasonLabel">Reason</p>
                            <textarea
                                readOnly={false}
                                className="editAccessRequestReasonDisplay"
                                defaultValue="Insert reason here."
                            ></textarea>
                        </div>
                        <div className="editAccessRequestStatusDiv">
                            <p className="editAccessRequestStatusLabel">Status</p>
                            <p className="editAccessRequestStatusDisplay">Approved</p>
                        </div>
                        <div className="editAccessRequestButtonsDiv">
                            <button
                                className="editAccessRequestButton"
                                onClick={() => console.log('Edit Accees Request')}
                            >
                                Submit
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </Popup>
    );
};

export default EditAccessRequest;
