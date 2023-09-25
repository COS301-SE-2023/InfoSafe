import React, {useState} from "react";
import ViewAssetRequest from "../View/ViewAssetRequest";
import ReviewAssetRequest from "../ReviewAssetRequest";
import "../../styling/AssetRequests.css";
import {FaSearch} from "react-icons/fa";
import {useGetAssAR} from "../getData/getAssAR";
import {useGetPerms} from "../getData/getPerms";
export const AssetRequest = () => {
    const {roles} = useGetPerms();
    const {showAssetRequests} = useGetAssAR();
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
                        Asset Request {assetRequest.asset_request_id}
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
    return (
        <div className="display">
            <div className="assetRequestsBackground">
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
                    <ul className="assetRequestsList">{assetRequests}</ul>
                </div>
            </div>

        </div>
    )
}