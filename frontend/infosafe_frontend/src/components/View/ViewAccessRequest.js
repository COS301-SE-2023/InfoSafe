import Popup from 'reactjs-popup';
import React from 'react';
import '../../styling/ViewAccessRequest.css';
import { IoArrowBackOutline } from 'react-icons/io5';
/* eslint-disable react/prop-types */
/* eslint-disable  no-unused-vars */

const ViewAccessRequest = ({access, popupClose, popupOpen }) => {
    return (
        <Popup access={access} open={popupOpen} closeOnDocumentClick={false} position="center center">
            <div className="viewAccessRequestPopup">
                <div className="popupBackground">
                    <div className="viewAccessRequestPopupBorder">
                        <button className="viewAccessRequestBackButton" onClick={popupClose} data-testid="back-button">
                            <IoArrowBackOutline className="viewAccessRequestBackIcon" />
                        </button>
                        <p className="viewAccessRequestTitle">View Access Request</p>
                        <div className="viewAccessRequestContent">
                            <p className="viewAccessRequestDatascopeLabel">Data Scope</p>
                            <p className="viewAccessRequestDatascopeNameDisplay">{access.data_scope_id.ds_name}</p>
                            <p className="viewAccessRequestRoleLabel">User</p>
                            <p className="viewAccessRequestRoleDisplay">{access.user_id.first_name} {access.user_id.last_name}</p>
                            <p className="viewAccessRequestReasonLabel">Reason</p>
                            <textarea
                                readOnly={true}
                                className="viewAccessRequestReasonDisplay"
                                defaultValue={access.reason}>
                            </textarea>
                            <p className="viewAccessRequestStatusLabel">Status</p>
                            <p className="viewAccessRequestStatusDisplay">{access.status}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Popup>
    );
};
export default ViewAccessRequest;
