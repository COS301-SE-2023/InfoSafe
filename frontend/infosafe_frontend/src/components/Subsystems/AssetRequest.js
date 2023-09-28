import React, {useEffect, useState} from "react";
import ViewAssetRequest from "../View/ViewAssetRequest";
import ReviewAssetRequest from "../Reviews/ReviewAssetRequest";
import "../../styling/AssetRequests.css";
import {FaSearch} from "react-icons/fa";
import {useGetAssAR} from "../getData/getAssAR";
import {useGetPerms} from "../getData/getPerms";
import {HelpPopup} from "../HelpPopup";
import {IoHelpCircle} from 'react-icons/io5';
import assetrequest_help from "../../images/assetrequest_help.png";

export const AssetRequest = () => {
    const {roles} = useGetPerms();
    const {showAssetRequests, loading, fetchAllAssets} = useGetAssAR();

    useEffect(() => {
        fetchAllAssets();
    }, []);

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
                            onAssApproval={fetchAllAssets}
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

    return (
        <div className="display">
            <div className="assetRequestsBackground">
                <button  className="assetRequestsHelpButton" onClick={() => setHelpOpen(true)}>
                    <IoHelpCircle className="helpPopupIcon"></IoHelpCircle>
                    {helpOpen ? (
                        <HelpPopup
                            popupClose={() => setHelpOpen(false)}
                            popupOpen={helpOpen}
                            image={assetrequest_help}
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
                        <div className="loadingScreen">
                            <div className="loadingDiv">
                                <div className="loading"></div>
                            </div>
                        </div>
                    ) : (
                    <ul className="assetRequestsList">{assetRequests}</ul>
                        )}
                </div>
            </div>

        </div>
    )
}