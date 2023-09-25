import React, {useState} from "react";
import ViewSupportRequest from "../View/ViewSupportRequest";
import {FaSearch} from "react-icons/fa";
import EditSupportRequest from "../Edit/EditSupportRequest";
import {RiEditBoxFill} from "react-icons/ri";
import "../../styling/SupportRequests.css";
import {useGetPerms} from "../getData/getPerms";
import {useGetSR} from "../getData/getSR";

export const SupportRequests = () => {
    const {showMySupport, showAllSupport} = useGetSR();
    const {roles} = useGetPerms();
    const [viewMy, setViewMy] = useState(false);
    const EditSupportRequestDiv = ({allSupport}) => {
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
                    <EditSupportRequestDiv support={allSupport}></EditSupportRequestDiv>
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
                <EditMySupportRequestDiv support={mySupport}></EditMySupportRequestDiv>
            </li>
        )
    }


    const my_requests = [];
    showMySupport.map((mySupport) =>
        my_requests.push(<ViewMySupport mySupport={mySupport} key={mySupport.support_id}/>)
    );

    const AllSupport = () => {
        const active_requests = [];
        showAllSupport.map((allSupport) =>
            active_requests.push(<ViewAllSupport allSupport={allSupport} key={allSupport.support_id}/>)
        );

        if(roles.includes("support_requests_viewAll")){
            return (
                <div className="active_support_requests" id="active_support_requests" style={{ display: `${allDisplay}`}}>
                    <ul className="activeRequestsList">{active_requests}</ul>
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
                    <ul className="myRequestsList">{my_requests}</ul>
                </div>
            </div>
        )
    }

    const changeView = () => {
        setViewMy(!viewMy);
        if ( !viewMy ){
            setAllDisplay("block");
            setMyDisplay("none");
            // document.getElementById("active_support_requests").style.display = "none";
            // document.getElementById("my_support_requests").style.display = "block";
        }else  {
            setAllDisplay("none");
            setMyDisplay("block");
            // document.getElementById("active_support_requests").style.display = "block";
            // document.getElementById("my_support_requests").style.display = "none";
        }
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
                {roles.includes("support_requests_viewAll") &&
                    <div className="changeViewBtnDiv">
                        <button className="changeViewBtn" onClick={changeView} id="changeViewBtn">Change View</button>
                    </div>
                }

            </div>
        </div>
    )
}