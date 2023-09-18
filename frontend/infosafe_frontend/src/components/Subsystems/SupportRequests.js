import React, {useState} from "react";
import AccessAndDisplay from "../Roles/AccessAndDisplay";
import ViewSupportRequest from "../View/ViewSupportRequest";
import {FaRegEdit, FaSearch} from "react-icons/fa";
import EditSupportRequest from "../Edit/EditSupportRequest";
import "../../styling/SupportRequests.css";
export const SupportRequests = () => {
    const {showMySupport, showAllSupport, roles} = AccessAndDisplay()

    const EditSupportRequestDiv = ({allSupport}) => {
        const [editSupportRequestOpen, setEditSupportRequestOpen] = useState(false);
        if(roles.includes("support_requests_edit")) {
            return (
                <div className="EditIcon">
                    <FaRegEdit

                        onClick={() => setEditSupportRequestOpen(!editSupportRequestOpen)}
                    />
                    {editSupportRequestOpen ? (
                        <EditSupportRequest
                            popupClose={() => setEditSupportRequestOpen(false)}
                            popupOpen={editSupportRequestOpen}
                            support={allSupport}
                        />
                    ) : null}
                </div>
            )
        } else {
            return null;
        }
    }

    const EditMySupportRequestDiv = ({mySupport}) => {
        const [editSupportRequestOpen, setEditSupportRequestOpen] = useState(false);
            return (
                <div className="EditIcon">
                    <FaRegEdit

                        onClick={() => setEditSupportRequestOpen(!editSupportRequestOpen)}
                    />
                    {editSupportRequestOpen ? (
                        <EditSupportRequest
                            popupClose={() => setEditSupportRequestOpen(false)}
                            popupOpen={editSupportRequestOpen}
                            support={mySupport}
                        />
                    ) : null}
                </div>
            )
    }

    const ViewAllSupport = ({ allSupport }) => {
        const [viewSupportRequestOpen, setViewSupportRequestOpen] = useState(false);
        if(roles.includes("support_requests_viewAll")) {
            return (
                <li key={allSupport.support_id}>
                    <p onClick={() => setViewSupportRequestOpen(!viewSupportRequestOpen)}>
                        Support Request {allSupport.support_id}
                        {viewSupportRequestOpen ? (
                            <ViewSupportRequest
                                popupClose={() => setViewSupportRequestOpen(false)}
                                popupOpen={viewSupportRequestOpen}
                                support={allSupport}
                            />
                        ) : null}
                    </p>
                    <EditSupportRequestDiv></EditSupportRequestDiv>
                </li>
            )
        } else {
            return null;
        }
    }

    const ViewMySupport = ({ mySupport }) => {
        const [viewSupportRequestOpen, setViewSupportRequestOpen] = useState(false); // ISO DISO Employee AM
        return(
            <li key={mySupport.support_id}>
                <p onClick={() => setViewSupportRequestOpen(!viewSupportRequestOpen)}>
                    Support Request {mySupport.support_id}
                    {viewSupportRequestOpen ? (
                        <ViewSupportRequest
                            popupClose={() => setViewSupportRequestOpen(!viewSupportRequestOpen)}
                            popupOpen={viewSupportRequestOpen}
                            support={mySupport}
                        />
                    ) : null}
                </p>{' '}
                <EditMySupportRequestDiv></EditMySupportRequestDiv>
            </li>
        )
    }

    const active_requests = [];
    showAllSupport.map((allSupport) =>
        active_requests.push(<ViewAllSupport allSupport={allSupport} key={allSupport.support_id}/>)
    );
    const my_requests = [];
    showMySupport.map((mySupport) =>
        my_requests.push(<ViewMySupport mySupport={mySupport} key={mySupport.support_id}/>)
    );

    const ViewSupportRequests = () =>{
        return(
            <div className="tables">
                <div className="active_support_requests">
                    <ul className="activeRequestsList">{active_requests}</ul>
                </div>
                <div className="my_support_requests">
                    <ul className="myRequestsList">{my_requests}</ul>
                </div>
            </div>
        )
    }

    return(
        <div className="display">
            <div className="supportRequestsBackground">
                <div className="searchSupportRequests">
                    <input
                        // data-testid="supportRequestSearch"
                        className="supportRequestSearchInput"
                        type="text"
                        id="supportRequestSearchInput"
                        name="supportRequestSearch"
                        // onChange={}
                    />
                    <FaSearch className="supportRequestSearchIcon" />
                </div>
                <ViewSupportRequests></ViewSupportRequests>
                <div className="supportRequestButtonsDiv">
                    <button
                        className="viewMySupportRequestButton"
                        // onClick={() => setCreateDeviceOpen(!createDeviceOpen)}
                    >
                        View My Support Requests
                    </button>
                    <button
                        className="viewAllSupportRequestButton"
                        // onClick={() => setCreateDeviceOpen(!createDeviceOpen)}
                    >
                        View All Support Requests
                    </button>
                </div>
            </div>
        </div>
    )
}