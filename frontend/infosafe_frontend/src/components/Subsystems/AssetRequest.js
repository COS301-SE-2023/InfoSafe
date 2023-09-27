import React, {useState} from "react";
import ViewAssetRequest from "../View/ViewAssetRequest";
import ReviewAssetRequest from "../Reviews/ReviewAssetRequest";
import "../../styling/AssetRequests.css";
import {FaSearch} from "react-icons/fa";
import {useGetAssAR} from "../getData/getAssAR";
import {useGetPerms} from "../getData/getPerms";
import {HelpPopup} from "../HelpPopup";
import {IoHelpCircle} from 'react-icons/io5';
export const AssetRequest = () => {
    const {roles} = useGetPerms();
    const {showAssetRequests, loading} = useGetAssAR();
    const AssetRequestApproval = ({ assetRequest }) =>{
        const [assetRequestOpen,setAssetRequestOpen] = useState(false);
        if(roles.includes("asset_request_review")) {
            return (
                <div className="reviewAssetRequestDiv">
                    <button
                        onClick={() => setAssetRequestOpen(true)}
                        className="reviewAssetRequestButton"
                    >
                        Review
                    </button>
                    {assetRequestOpen ? (
                        <ReviewAssetRequest
                            popupClose={() => setAssetRequestOpen(false)}
                            popupOpen={assetRequestOpen}
                            assetRequest={assetRequest}
                        />
                    ) : null}
                </div>
            )
        } else {
            return null;
        }
    }

    const ViewAssetRequests = ({ assetRequest }) => {
        const [viewAssetRequestOpen, setViewAssetRequestOpen] = useState(false);
        if(roles.includes("asset_request_review")) {
            return (
                <li key={assetRequest.asset_request_id}>
                    <p onClick={() => setViewAssetRequestOpen(!viewAssetRequestOpen)}>
                        Asset Request {assetRequest.asset_request_id}{/* : {assetRequest.asset.asset_name}*/}
                        {viewAssetRequestOpen ? (
                            <ViewAssetRequest
                                popupClose={() => setViewAssetRequestOpen(false)}
                                popupOpen={viewAssetRequestOpen}
                                assetRequest={assetRequest}
                            />
                        ) : null}
                    </p>
                    <AssetRequestApproval assetRequest={assetRequest}></AssetRequestApproval>
                </li>
            );
        } else {
            return null;
        }
    };

    const assetRequests = [];
    showAssetRequests.map((assetRequest) =>
        assetRequests.push(<ViewAssetRequests assetRequest={assetRequest} key={assetRequest.asset_request_id}/>)
    );
    if (assetRequests.length === 0)
    {
        assetRequests[0] = "No Asset Requests added yet.";
    }

    const [helpOpen, setHelpOpen] = useState(false);
    const helpMsg = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

    return (
        <div className="display">
            <div className="assetRequestsBackground">
                <button  className="assetRequestsHelpButton" onClick={() => setHelpOpen(true)}>
                    <IoHelpCircle className="helpPopupIcon"></IoHelpCircle>
                    {helpOpen ? (
                        <HelpPopup
                            popupClose={() => setHelpOpen(false)}
                            popupOpen={helpOpen}
                            message={helpMsg}
                        />
                    ) : null}
                </button>
                <div className="searchAssetRequests">
                    <input
                        // data-testid="assetRequestSearch"
                        className="assetRequestSearchInput"
                        type="text"
                        id="assetRequestSearchInput"
                        name="assetRequestSearch"
                        // onChange={}
                    />
                    <FaSearch className="deviceSearchIcon" />
                </div>
                <div className="assetRequests">
                    {loading ? (
                        <p>Loading...</p> // Display a loading message while data is being fetched
                    ) : (
                    <ul className="assetRequestsList">{assetRequests}</ul>
                        )}
                </div>
            </div>

        </div>
    )
}