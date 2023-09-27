import React, {useEffect, useState} from "react";
import ViewSupportRequest from "../View/ViewSupportRequest";
import {FaSearch} from "react-icons/fa";
import EditSupportRequest from "../Edit/EditSupportRequest";
import {RiEditBoxFill} from "react-icons/ri";
import "../../styling/SupportRequests.css";
import {useGetPerms} from "../getData/getPerms";
import {useGetSR} from "../getData/getSR";
import {HelpPopup} from "../HelpPopup";
import {IoHelpCircle} from 'react-icons/io5';
export const SupportRequests = () => {
    const {showMySupport, showAllSupport, loading, fetchAllSupport, fetchMySupport} = useGetSR();
    const {roles} = useGetPerms();
    const [viewMy, setViewMy] = useState(false);

    useEffect(() => {
        fetchMySupport();
        fetchAllSupport();
    }, []);

    const EditSupportRequestDiv = ({ supp }) => {
        const [editSupportRequestOpen, setEditSupportRequestOpen] = useState(false);
        if(roles.includes("support_requests_edit")) {
            return (
                <div className="supportRequestEditButton">
                    <RiEditBoxFill
                        className="supportRequestEditIcon"
                        onClick={() => setEditSupportRequestOpen(!editSupportRequestOpen)}
                    />
                    {editSupportRequestOpen ? (
                        <EditSupportRequest
                            popupClose={() => setEditSupportRequestOpen(false)}
                            popupOpen={editSupportRequestOpen}
                            support={supp}
                            editAllSupport={fetchAllSupport}
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
                <div className="supportRequestEditButton">
                    <RiEditBoxFill
                        className="supportRequestEditIcon"
                        onClick={() => setEditSupportRequestOpen(!editSupportRequestOpen)}
                    />
                    {editSupportRequestOpen ? (
                        <EditSupportRequest
                            popupClose={() => setEditSupportRequestOpen(false)}
                            popupOpen={editSupportRequestOpen}
                            support={mySupport}
                            editMySupport={fetchMySupport}
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
                    <EditSupportRequestDiv supp={allSupport}></EditSupportRequestDiv>
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
                <EditMySupportRequestDiv supp={mySupport}></EditMySupportRequestDiv>
            </li>
        )
    }


    const my_requests = [];
    showMySupport.map((mySupport) =>
        my_requests.push(<ViewMySupport mySupport={mySupport} key={mySupport.support_id}/>)
    );
    if (my_requests.length === 0)
    {
        my_requests[0] = "No Support Requests added yet.";
    }

    const AllSupport = () => {
        const active_requests = [];
        showAllSupport.map((allSupport) =>
            active_requests.push(<ViewAllSupport allSupport={allSupport} key={allSupport.support_id}/>)
        );
        if (active_requests.length === 0)
        {
            active_requests[0] = "No Support Requests added yet.";
        }

        if(roles.includes("support_requests_viewAll")){
            return (
                <div className="active_support_requests" id="active_support_requests" style={{ display: `${allDisplay}`}}>
                    <p className="listTypeHeader">All Support Requests</p>
                    {loading ? (
                        <div className="loadingScreen">
                            <div className="loadingDiv">
                                <div className="loading"></div>
                            </div>
                        </div>
                    ) : (
                    <ul className="activeRequestsList">{active_requests}</ul>
                        )}
                </div>
            )
        }else {
            return null;
        }
    }
    const [myDisplay, setMyDisplay] = useState("block");
    const [allDisplay, setAllDisplay] = useState("none");

    const ViewSupportRequests = () =>{
        return(
            <div className="tables">
                <AllSupport></AllSupport>
                <div className="my_support_requests" id="my_support_requests" style={{ display: `${myDisplay}`}}>
                    <p className="listTypeHeader">My Support Requests</p>
                    {loading ? (
                        <div className="loadingScreen">
                            <div className="loadingDiv">
                                <div className="loading"></div>
                            </div>
                        </div>
                    ) : (
                    <ul className="myRequestsList">{my_requests}</ul>
                        )}
                </div>
            </div>
        )
    }

    const changeView = () => {
        setViewMy(!viewMy);
        if ( !viewMy ){
            setAllDisplay("block");
            setMyDisplay("none");
        }else  {
            setAllDisplay("none");
            setMyDisplay("block");
        }
    }

    const [helpOpen, setHelpOpen] = useState(false);

    const helpMsg = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";


    return(
        <div className="display">
            <div className="supportRequestsBackground">
                <button  className="supportRequestsHelpButton" onClick={() => setHelpOpen(true)}>
                    <IoHelpCircle className="helpPopupIcon"></IoHelpCircle>
                    {helpOpen ? (
                        <HelpPopup
                            popupClose={() => setHelpOpen(false)}
                            popupOpen={helpOpen}
                            message={helpMsg}
                        />
                    ) : null}
                </button>
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
                {roles.includes("support_requests_viewAll") &&
                    <div className="changeViewBtnDiv">
                        <button className="changeViewBtn" onClick={changeView} id="changeViewBtn">Change View</button>
                    </div>
                }

            </div>
        </div>
    )
}