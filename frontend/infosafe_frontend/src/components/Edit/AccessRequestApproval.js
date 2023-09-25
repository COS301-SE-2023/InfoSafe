import Popup from 'reactjs-popup';
import React, { useEffect, useState } from 'react';
import '../../styling/AccessRequestApproval.css';
import { IoArrowBackOutline } from 'react-icons/io5';

const AccessRequestApproval = ({ access, popupClose, popupOpen }) => {
    const ACCESSREQUESTSTATUSOPTIONS = ['LOGGED', 'APPROVED', 'REJECTED'];
    const [review, setReview] = useState(false);

    const handleReview = (reviewValue) => {
        setReview(reviewValue);
        const payload = {review, request_id: access.request_id, dataScope_id: access.dataScope_id, user_email: access.user_email}
        fetch('http://localhost:8080/api/accessrequest/reviewAccess', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + sessionStorage.getItem('accessToken'),
            },
            body: JSON.stringify(payload),
        })
            .then(() => {
                console.log('Updated User');
                popupClose();
            });
    };

    return (
        <Popup access={access} open={popupOpen} closeOnDocumentClick={false} position="center center">
            <div className="approveAccessRequestPopup">
                <div className="popupBackground">
                    <div className="approveAccessRequestPopupBorder">
                        <button className="approveAccessRequestBackButton" onClick={popupClose}>
                            <IoArrowBackOutline className="approveAccessRequestBackIcon" />
                        </button>
                        <form>
                            <p className="approveAccessRequestTitle">Access Request Approval</p>
                            <p className="approveAccessRequestDatascopeLabel">Data Scope</p>
                            <p className="approveAccessRequestDatascopeNameDisplay">{access.data_scope_id.ds_name}</p>
                            <p className="approveAccessRequestRoleLabel">User</p>
                            <p className="approveAccessRequestRoleDisplay">{access.user_id.first_name} {access.user_id.last_name}</p>
                            <p className="approveAccessRequestReasonLabel">Reason</p>
                            <textarea
                                readOnly={true}
                                className="approveAccessRequestReasonDisplay"
                                defaultValue={access.reason}
                            ></textarea>
                            <p className="approveAccessRequestStatusLabel">Status</p>
                            <p className="approveAccessRequestStatusDisplay">{access.status}</p>
                            <div className="approveAccessRequestButtonsDiv">
                                <button
                                    className="approveAccessRequestApproveButton"
                                    onClick={() => handleReview(true)}
                                >
                                    Accept
                                </button>
                                <button
                                    className="approveAccessRequestRejectButton"
                                    onClick={() => handleReview(false)}
                                >
                                    Reject
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Popup>
    );
};

export default AccessRequestApproval;
