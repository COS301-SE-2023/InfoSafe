import React, {useState} from "react";
import AccessAndDisplay from "../Roles/AccessAndDisplay";
import ViewSupportRequest from "../View/ViewSupportRequest";
import {FaRegEdit} from "react-icons/fa";
import EditSupportRequest from "../Edit/EditSupportRequest";

const SupportRequests = () => {
    const {showMySupport, showAllSupport} = AccessAndDisplay()

    const EditSupportRequest = ({allSupport}) => {
        const [editSupportRequestOpen, setEditSupportRequestOpen] = useState(false); // ISO DISO
        return(
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
    }

    const EditMySupportRequest = ({mySupport}) => {
        const [editSupportRequestOpen, setEditSupportRequestOpen] = useState(false);
        return(
            <div  className="EditIcon">
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
        return(
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
                <EditSupportRequest></EditSupportRequest>
            </li>
        )
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
                <EditMySupportRequest></EditMySupportRequest>
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
            <div>
                <div className="titles">
                    <div className="activeHeader">
                        <p>Active System Requests</p>
                    </div>
                    <div className="myHeader">
                        <p>My Requests</p>
                    </div>
                </div>

                <ViewSupportRequests></ViewSupportRequests>
            </div>
        </div>
    )
}