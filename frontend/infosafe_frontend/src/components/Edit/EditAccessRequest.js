import Popup from 'reactjs-popup';
import React, { useEffect, useState } from 'react';
import '../../styling/EditAccessRequest.css';
import { IoArrowBackOutline } from 'react-icons/io5';

const EditAccessRequest = ({ access, popupClose, popupOpen, onArEdited }) => {
    const ACCESSREQUESTSTATUSOPTIONS = ['LOGGED', 'APPROVED', 'REJECTED'];

    const [values, setValues] = useState({
        request_id: access.request_id,
        user_id: access.user_id,
        data_scope_id: access.data_scope_id,
        status: access.status,
        reason: access.reason
    });

    useEffect(() => {
        if (access) {
            setValues({
                request_id: access.request_id,
                user_id: access.user_id,
                data_scope_id: access.data_scope_id,
                status: access.status,
                reason: access.reason
            });
        }
    }, [access]);

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(values)

        fetch('https://infosafe.live/api/accessrequest/update/' + access.request_id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            },
            body: JSON.stringify(values)
        })
            .then((response) => {
                if (response.ok) {
                    console.log("Updated AccessRequest");
                    onArEdited();
                } else {
                    console.error('Error updating AccessRequest:', response.status);
                }
            })
            .catch((error) => {
                console.error('Error updating AccessRequest:', error);
            });

        popupClose();
    }

    return (
        <Popup access={access} open={popupOpen} closeOnDocumentClick={false} position="center center">
            <div className="editAccessRequestPopup">
                <div className="popupBackground">
                    <div className="editAccessRequestPopupBorder">
                        <button className="editAccessRequestBackButton" onClick={popupClose} data-testid="back-button">
                            <IoArrowBackOutline className="editAccessRequestBackIcon" />
                        </button>
                        <form onSubmit={handleSubmit}>
                            <p className="editAccessRequestTitle">Edit Access Request</p>
                            <div className="editAccessRequestContent">
                                <p className="editAccessRequestDatascopeLabel">Data Scope</p>
                                <p className="editAccessRequestDatascopeNameDisplay">{access.data_scope_id.ds_name}</p>
                                <p className="editAccessRequestRoleLabel">User</p>
                                <p className="editAccessRequestRoleDisplay">{access.user_id.first_name} {access.user_id.last_name}</p>
                                <p className="editAccessRequestReasonLabel">Reason</p>
                                <textarea
                                    readOnly={false}
                                    className="editAccessRequestReasonDisplay"
                                    defaultValue={access.reason}
                                    onChange={e => setValues({ ...values, reason: e.target.value })}
                                ></textarea>
                                <p className="editAccessRequestStatusLabel">Status</p>
                                <p className="editAccessRequestStatusDisplay">{access.status}</p>
                                <button
                                    className="editAccessRequestButton"
                                    type="submit"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Popup>
    );
};

export default EditAccessRequest;
