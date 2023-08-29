import React, {useState} from "react";
import ViewAssetRequest from "../View/ViewAssetRequest";
import AccessAndDisplay from "../Roles/AccessAndDisplay";
import ReviewAssetRequest from "../ReviewAssetRequest";

const AssetRequest = () => {
    const {showAssetRequests, roles} = AccessAndDisplay()

    const AssetRequestApproval = ({ assetRequest }) => {
        const [assetRequestOpen,setAssetRequestOpen] = useState(false);
        if(roles.includes("asset_request_review")) {
            return (
                <div className="reviewAssetRequestButton">
                    <button
                        onClick={() => setAssetRequestOpen(true)}
                    >
                        Review
                    </button>
                    {assetRequestOpen ? (
                        <ReviewAssetRequest
                            popupClose={() => setAssetRequestOpen(false)}
                            popupOpen={assetRequestOpen}
                            asset={assetRequest}
                        />
                    ) : null}
                </div>
            )
        } else {
            return (null)
        }
    }


    const ViewAssetRequests = ({ assetRequest }) => { // asset request request??
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
                                asset={assetRequest}
                            />
                        ) : null}
                        <AssetRequestApproval></AssetRequestApproval>
                    </p>
                </li>
            );
        } else {
            return (null)
        }
    };

    const assetRequests = [];
    showAssetRequests.map((assetRequest) =>
        assetRequest.push(<ViewAssetRequests assetRequest={assetRequest} key={assetRequest.asset_request_id}/>)
    );
    return (
        <div className="display">
            <div className="assetRequests">
                <ul className="assetRequestsList">{assetRequests}</ul>
            </div>
        </div>
    )
}