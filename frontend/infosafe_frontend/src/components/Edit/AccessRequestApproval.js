import Popup from 'reactjs-popup';
import React from 'react';
import '../../styling/AccessRequestApproval.css';
import { IoArrowBackOutline } from 'react-icons/io5';
/* eslint-disable react/prop-types */
/* eslint-disable  no-unused-vars */

const AccessRequestApproval = ({ popupClose, popupOpen }) => {
    const ACCESSREQUESTSTATUSOPTIONS = ['LOGGED', 'APPROVED', 'REJECTED'];
    return (
        <Popup open={popupOpen} closeOnDocumentClick={false} position="center center">
            <div className="approveAccessRequestPopup">
                <div className="approveAccessRequestPopupBorder">
                    <button className="approveAccessRequestBackButton" onClick={popupClose} data-testid="back-button">
                        <IoArrowBackOutline className="approveAccessRequestBackIcon" />
                    </button>
                    <form>
                        <p className="approveAccessRequestTitle">Access Request Approval</p>
                        <div className="approveAccessRequestDatascopeDiv">
                            <p className="approveAccessRequestDatascopeLabel">Data Scope</p>
                            <p className="approveAccessRequestDatascopeNameDisplay">Data Scope 9</p>
                        </div>
                        <div className="approveAccessRequestRoleDiv">
                            <p className="approveAccessRequestRoleLabel">Role</p>
                            <p className="approveAccessRequestRoleDisplay">ISO</p>
                        </div>
                        <div className="approveAccessRequestReasonDiv">
                            <p className="approveAccessRequestReasonLabel">Reason</p>
                            <textarea
                                readOnly={true}
                                className="approveAccessRequestReasonDisplay"
                                defaultValue="Insert reason here."
                            ></textarea>
                        </div>
                        <div className="approveAccessRequestStatusDiv">
                            <p className="approveAccessRequestStatusLabel">Status</p>
                            <p className="approveAccessRequestStatusDisplay">Approved</p>
                        </div>
                        <div className="approveAccessRequestButtonsDiv">
                            <button className="approveAccessRequestApproveButton" onClick={() => console.log("Access Request Accepted")}>Accept</button>
                            <button className="approveAccessRequestRejectButton" onClick={() => console.log("Access Request Rejected")}>Reject</button>
                        </div>
                    </form>
                </div>
            </div>
        </Popup>
    );
};

export default AccessRequestApproval;