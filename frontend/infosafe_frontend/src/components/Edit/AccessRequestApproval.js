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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values)
        fetch('http://localhost:8080/api/accessrequest/reviewAccess', {
            method:"PUT",
            headers:{"Content-Type":"application/json",
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            },
            body:JSON.stringify(values)
        }).then(()=>{
            console.log("Updated User")
        })
        popupClose()
    }

    return (
        <Popup access={access} open={popupOpen} closeOnDocumentClick={false} position="center center">
            <div className="approveAccessRequestPopup">
                <div className="popupBackground">
                    <div className="approveAccessRequestPopupBorder">
                        <button className="approveAccessRequestBackButton" onClick={popupClose}>
                            <IoArrowBackOutline className="approveAccessRequestBackIcon" />
                        </button>
                        <form onSubmit={handleSubmit}>
                            <p className="approveAccessRequestTitle">Access Request Approval</p>
                            <p className="approveAccessRequestDatascopeLabel">Data Scope</p>
                            <p className="approveAccessRequestDatascopeNameDisplay">{access.data_scope_id.ds_name}</p>
                            {/*Whats the meaning of the role*/}
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
                                {/*Should submit the form?*/}
                                <button className="approveAccessRequestApproveButton" onClick={() => console.log("Access Request Accepted")}>Accept</button>
                                {/*Should not submit the form?*/}
                                <button className="approveAccessRequestRejectButton" onClick={() => console.log("Access Request Rejected")}>Reject</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </Popup>
    );
};

export default AccessRequestApproval;