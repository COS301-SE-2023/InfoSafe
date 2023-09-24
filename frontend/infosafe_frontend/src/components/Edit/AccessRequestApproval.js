import Popup from 'reactjs-popup';
import React, {useEffect, useState} from 'react';
import '../../styling/AccessRequestApproval.css';
import { IoArrowBackOutline } from 'react-icons/io5';
/* eslint-disable react/prop-types */
/* eslint-disable  no-unused-vars */

const AccessRequestApproval = ({ access, popupClose, popupOpen }) => {
    const ACCESSREQUESTSTATUSOPTIONS = ['LOGGED', 'APPROVED', 'REJECTED'];

    const[values, setValues]=useState({
        request_id: '',
        user_id: '',
        dataScope_id: '',
        status: '',
        reason: ''
    });

    useEffect(() => {
        if (access) {
            setValues({
                request_id: access.request_id,
                user_id: access.user_id,
                dataScope_id: access.dataScope_id,
                status: access.status,
                reason: access.reason
            });
        }
    }, [access]);

    return (
        <Popup access={access} open={popupOpen} closeOnDocumentClick={false} position="center center">
            <div className="approveAccessRequestPopup">
                <div className="approveAccessRequestPopupBorder">
                    <button className="approveAccessRequestBackButton" onClick={popupClose}>
                        <IoArrowBackOutline className="approveAccessRequestBackIcon" />
                    </button>
                    <form>
                        <p className="approveAccessRequestTitle">Access Request Approval</p>
                        <div className="approveAccessRequestDatascopeDiv">
                            <p className="approveAccessRequestDatascopeLabel">Data Scope</p>
                            <p className="approveAccessRequestDatascopeNameDisplay">{access.request_id}</p>
                        </div>
                        {/*Whats the meaning of the role*/}
                        <div className="approveAccessRequestRoleDiv">
                            <p className="approveAccessRequestRoleLabel">Role</p>
                            <p className="approveAccessRequestRoleDisplay">ISO</p>
                        </div>
                        <div className="approveAccessRequestReasonDiv">
                            <p className="approveAccessRequestReasonLabel">Reason</p>
                            <textarea
                                readOnly={true}
                                className="approveAccessRequestReasonDisplay"
                                defaultValue={access.reason}
                            ></textarea>
                        </div>
                        <div className="approveAccessRequestStatusDiv">
                            <p className="approveAccessRequestStatusLabel">Status</p>
                            <p className="approveAccessRequestStatusDisplay">Logged</p>
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