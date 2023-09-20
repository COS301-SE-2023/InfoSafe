import Popup from "reactjs-popup";
import React, {useState} from "react";
import "../../styling/EditAccessRequest.css";
import { IoArrowBackOutline } from "react-icons/io5";
/* eslint-disable react/prop-types */
/* eslint-disable  no-unused-vars */

const EditAccessRequest = ({ access, popupClose, popupOpen }) => {
    const ACCESSREQUESTSTATUSOPTIONS = ["LOGGED", "APPROVED", "REJECTED"];

    const[values, setValues]=useState({
        request_id: access.request_id,
        user_id: access.user_id,
        ds_id: access.ds_id,
        status: access.status,
        reason: access.reason
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values)
        fetch("http://ec2-174-129-77-195.compute-1.amazonaws.com:8080/api/accessrequest/update/" + access.request_id, {
            method:"PUT",
            headers:{"Content-Type":"application/json",
                Authorization: "Bearer " + sessionStorage.getItem("accessToken")
            },
            body:JSON.stringify(values)
        }).then(()=>{
            console.log("Updated AccessRequest")
        })
        //console.log(JSON.stringify(values))
        popupClose()
    }

    return (
        <Popup open={popupOpen} closeOnDocumentClick={false} position="center center">
            <div className="editAccessRequestPopup">
                <div className="editAccessRequestPopupBorder">
                    <button className="editAccessRequestBackButton" onClick={popupClose} data-testid="back-button">
                        <IoArrowBackOutline className="editAccessRequestBackIcon" />
                    </button>
                    <form onSubmit={handleSubmit}>
                        <p className="editAccessRequestTitle">Edit Access Request</p>
                        <div className="editAccessRequestDatascopeDiv">
                            <p className="editAccessRequestDatascopeLabel">Data Scope</p>
                            <p className="editAccessRequestDatascopeNameDisplay">{access.ds_id}</p>
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
                                defaultValue={access.reason}
                                onChange={e => setValues({...values, reason: e.target.value})}
                            ></textarea>
                        </div>
                        <div className="editAccessRequestStatusDiv">
                            <p className="editAccessRequestStatusLabel">Status</p>
                            <p className="editAccessRequestStatusDisplay">{access.status}</p>
                        </div>
                        <div className="editAccessRequestButtonsDiv">
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
        </Popup>
    );
};

export default EditAccessRequest;
