import React, {useState} from "react";
import ViewAccessRequest from "../View/ViewAccessRequest";
import {FaRegEdit} from "react-icons/fa";
import EditAccessRequest from "../Edit/EditAccessRequest";
import {RiDeleteBin6Fill} from "react-icons/ri";
import AccessRequestApproval from "../Edit/AccessRequestApproval";
import AccessAndDisplay from "../Roles/AccessAndDisplay";

export const AccessRequests = () => {
    const {showAccess, roles} = AccessAndDisplay()
    const [approveAccessRequestOpen, setApproveAccessRequestOpen]= useState(false);

    const EditAccessRequest = ({access}) => {
        const [editAccessRequestOpen, setEditAccessRequestOpen] = useState(false);
        if(roles.includes("access_requests_edit")) {
            return (
                <div className="EditIcon">
                    <FaRegEdit
                        onClick={() => setEditAccessRequestOpen(!editAccessRequestOpen)}
                    />
                    {editAccessRequestOpen ? (
                        <EditAccessRequest
                            popupClose={() => setEditAccessRequestOpen(false)}
                            popupOpen={editAccessRequestOpen}
                            access={access}
                        />
                    ) : null}
                </div>
            )
        } else {
            return (null)
        }
    }

    const DeleteAccessRequest = () => {
        if(roles.includes("access_request_delete")) {
            return (
                <RiDeleteBin6Fill className="DeleteIcon"/>
            )
        } else {
            return (null)
        }
    }
    const ViewAccessRequests = ({access}) => {
        const [viewAccessRequestOpen, setViewAccessRequestOpen] = useState(false); // ISO DISO
        if(roles.includes("access_requests_edit") || roles.includes("access_requests_approve")) {
            return (
                <li key={access.request_id}>
                    <p onClick={() => setViewAccessRequestOpen(!viewAccessRequestOpen)}>
                        Access Request {access.request_id}
                        {viewAccessRequestOpen ? (
                            <ViewAccessRequest
                                popupClose={() => setViewAccessRequestOpen(false)}
                                popupOpen={viewAccessRequestOpen}
                                access={access}
                            />
                        ) : null}
                    </p>
                    <EditAccessRequest></EditAccessRequest>
                    <DeleteAccessRequest></DeleteAccessRequest>
                </li>
            );
        } else {
            return (null)
        }
    };

    const ApproveAccessRequest = () => {
        if(roles.includes("access_requests_approve")) {
            return (
                <div className="ApproveAccessRequestButtonDiv">
                    <button
                        className="approveAccessRequestButton"
                        data-testid="approveAccessRequestButton"
                        onClick={() => setApproveAccessRequestOpen(true)}
                    >
                        Access Request Approval
                    </button>
                    {approveAccessRequestOpen ? (
                        <AccessRequestApproval
                            popupClose={() => setApproveAccessRequestOpen(false)}
                            popupOpen={approveAccessRequestOpen}
                        />
                    ) : null}
                </div>
            )
        } else {
            return (null)
        }
    }

    const accessRequests = [];
    showAccess.map((access) =>
        accessRequests.push(<ViewAccessRequests access={access} key={access.request_id}/>)
    );
    return (
        <div className="display">
            <div className="accessRequests">
                <ul className="accessrequestsList">{accessRequests}</ul>
            </div>
            <ApproveAccessRequest></ApproveAccessRequest>
        </div>
    );
}