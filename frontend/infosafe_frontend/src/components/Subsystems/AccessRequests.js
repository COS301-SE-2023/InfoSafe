import React, {useState} from "react";
import ViewAccessRequest from "../View/ViewAccessRequest";
import {FaRegEdit, FaSearch} from "react-icons/fa";
import EditAccessRequest from "../Edit/EditAccessRequest";
import {RiDeleteBin6Fill, RiEditBoxFill} from "react-icons/ri";
import AccessRequestApproval from "../Reviews/AccessRequestApproval";
import "../../styling/AccessRequests.css";
import {getRoles} from "@testing-library/react";
import {useGetAr} from "../getData/getAR";
import {useGetPerms} from "../getData/getPerms";
import {IoHelpCircle} from "react-icons/io5";
import {HelpPopup} from "../HelpPopup";

export const AccessRequests = () => {
    const {roles} = useGetPerms();
    const {showAccess, loading} = useGetAr();

    const EditAccessRequestDiv = ({access}) => {
        const [editAccessRequestOpen, setEditAccessRequestOpen] = useState(false);
        if(roles.includes("access_requests_edit")) {
            return (
                <div className="accessRequestsEditButton">
                    <RiEditBoxFill
                        onClick={() => setEditAccessRequestOpen(!editAccessRequestOpen)}
                        className="accessRequestsEditIcon"
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
            return null
        }
    }

    const DeleteAccessRequest = () => {
        if(roles.includes("access_request_delete")) {
            return (
                <RiDeleteBin6Fill className="DeleteIcon"/>
            )
        } else {
            return null
        }
    }
    const ViewAccessRequests = ({access}) => {
        const [viewAccessRequestOpen, setViewAccessRequestOpen] = useState(false); // ISO DISO
        if(roles.includes("access_requests_edit") || roles.includes("access_requests_approve")) {
            return (
                <li key={access.request_id}>
                    <p onClick={() => setViewAccessRequestOpen(!viewAccessRequestOpen)}>
                        Access Request to {access.data_scope_id.ds_name}
                        {viewAccessRequestOpen ? (
                            <ViewAccessRequest
                                popupClose={() => setViewAccessRequestOpen(false)}
                                popupOpen={viewAccessRequestOpen}
                                access={access}
                            />
                        ) : null}
                    </p>
                    <ApproveAccessRequest access={access}></ApproveAccessRequest>
                    <EditAccessRequestDiv access={access}></EditAccessRequestDiv>
                    <DeleteAccessRequest></DeleteAccessRequest>
                </li>
            );
        } else {
            return null
        }
    };

    const ApproveAccessRequest = ({ access }) => {
        const [approveAccessRequestOpen, setApproveAccessRequestOpen]= useState(false);
        if(roles.includes("access_requests_approve")) {
            return (
                <div className="ApproveAccessRequestButtonDiv">
                    <button
                        className="approveAccessRequestButton"
                        data-testid="approveAccessRequestButton"
                        onClick={() => setApproveAccessRequestOpen(true)}
                    >
                        Review
                    </button>
                    {approveAccessRequestOpen ? (
                        <AccessRequestApproval
                            popupClose={() => setApproveAccessRequestOpen(false)}
                            popupOpen={approveAccessRequestOpen}
                            access={access}
                        />
                    ) : null}
                </div>
            )
        } else {
            return null
        }
    }

    const accessRequests = [];
    showAccess.map((access) =>
        accessRequests.push(<ViewAccessRequests access={access} key={access.request_id}/>)
    );
    if (accessRequests.length === 0)
    {
        accessRequests[0] = "No Access Requests added yet.";
    }

    const [helpOpen,setHelpOpen] = useState(false);
    const helpMsg = "";

    return (
        <div className="display">
            <div className="accessRequestsBackground">
                <button  className="accessHelpButton" onClick={() => setHelpOpen(true)}>
                    <IoHelpCircle className="accessHelpPopupIcon"></IoHelpCircle>
                    {helpOpen ? (
                        <HelpPopup
                            popupClose={() => setHelpOpen(false)}
                            popupOpen={helpOpen}
                            message={helpMsg}
                        />
                    ) : null}
                </button>
                <div className="searchAccessRequests">
                    <input
                        // data-testid="userSearch"
                        className="accessRequestsSearchInput"
                        type="text"
                        id="accessRequestsSearchInput"
                        name="accessRequestsSearch"
                        // onChange={}
                    />
                    <FaSearch className="accessRequestsSearchIcon" />
                </div>
                <div className="accessRequests">
                    {loading ? (
                        <div className="loadingScreen">
                            <div className="loadingDiv">
                                <div className="loading"></div>
                            </div>
                        </div>
                    ) : (
                    <ul className="accessrequestsList">{accessRequests}</ul>
                    )}
                </div>
            </div>
        </div>
    );
}