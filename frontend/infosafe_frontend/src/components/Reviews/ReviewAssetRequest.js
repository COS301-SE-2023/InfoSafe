import React, {useState} from 'react';
import '../../styling/ReviewAssetRequest.css';
import Popup from 'reactjs-popup';
import { IoArrowBackOutline } from 'react-icons/io5';

const ReviewAssetRequest = ({assetRequest, popupOpen, popupClose, onAssApproval}) => {

    const handleReview = (reviewValue) => {
        popupClose();
        const payload = {review: reviewValue, request_id: assetRequest.asset_request_id, asset_id: assetRequest.asset.asset_id, user_email: assetRequest.user.email}
        console.log(payload)
        fetch('http://localhost:8080/api/assetrequest/reviewAsset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + sessionStorage.getItem('accessToken'),
            },
            body: JSON.stringify(payload),
        })
            .then(() => {
                console.log('Approved');
                onAssApproval()
                //popupClose();
            });
    };
    return (
        <Popup open={popupOpen} closeOnDocumentClick={false} position= "center center">
            <div className="reviewAssetRequestOverlay">
                <div className="popupBackground">
                    <div className="reviewAssetRequestBorder">
                        <button className="reviewAssetRequestBackButton" onClick={popupClose} data-testid={"back-button"}>
                            <IoArrowBackOutline className="reviewAssetRequestBackIcon" />
                        </button>
                        <p className="reviewAssetRequestLabel">Review Asset Request</p>
                        <p className="reviewAssetRequestDeviceNameLabel">Device Name</p>
                        <p className="reviewAssetRequestDeviceName">{assetRequest.asset.asset_name}</p>
                        <p className="reviewAssetRequestUserLabel">User</p>
                        <p className="reviewAssetRequestUser">{assetRequest.user.first_name} {assetRequest.user.last_name}</p>
                        <p className="reviewAssetRequestReasonLabel">Reason</p>
                        <textarea className="reviewAssetRequestReason" readOnly={true} defaultValue={assetRequest.reason}></textarea>
                        <p className="reviewAssetRequestDateRequiredLabel">Date Required</p>
                        <p className="reviewAssetRequestDateRequired">{assetRequest.desired_date}</p>
                        <p className="reviewAssetRequestStatusLabel">Status</p>
                        <p className="reviewAssetRequestStatus">{assetRequest.request_status}</p>
                        <div className="reviewAssetRequestButtonsDiv">
                            <button
                                type = "button"
                                className="reviewAssetRequestApproveButton"
                                onClick={() => handleReview(true)}>
                                Accept
                            </button>
                            <button
                                type = "button"
                                className="reviewAssetRequestRejectButton"
                                onClick={() => handleReview(false)}>
                                Reject
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Popup>
    );

}

export default ReviewAssetRequest;