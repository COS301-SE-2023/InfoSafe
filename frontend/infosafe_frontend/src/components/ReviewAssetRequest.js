import React from "react";
import "../styling/ReviewAssetRequest.css";
import Popup from "reactjs-popup";
import { IoArrowBackOutline } from "react-icons/io5";
/* eslint-disable react/prop-types */
/* eslint-disable  no-unused-vars */

const ReviewAssetRequest = ({asset, popupOpen, popupClose}) => {
    return (
        <Popup open={popupOpen} closeOnDocumentClick={false} position= 'center center'>
            <div className='reviewAssetRequestOverlay'>
                <div className='reviewAssetRequestBorder'>
                    <button className='reviewAssetRequestBackButton' onClick={popupClose}>
                        <IoArrowBackOutline className='reviewAssetRequestBackIcon' />
                    </button>
                    <p className='reviewAssetRequestLabel'>Review Asset Request</p>
                    <p className='reviewAssetRequestDeviceNameLabel'>Device Name</p>
                    <p className='reviewAssetRequestDeviceName'>{asset.asset_name}</p>
                    <p className='reviewAssetRequestUserLabel'>User</p>
                    <p className='reviewAssetRequestUser'>{}</p>
                    <p className='reviewAssetRequestReasonLabel'>Reason</p>
                    <textarea className='reviewAssetRequestReason' readOnly={true} defaultValue='Reason for asset request here.'></textarea>
                    <p className='reviewAssetRequestDateRequiredLabel'>Date Required</p>
                    <p className='reviewAssetRequestDateRequired'>2023/08/01</p>
                    <p className='reviewAssetRequestStatusLabel'>Status</p>
                    <p className='reviewAssetRequestStatus'>Logged</p>
                    <div className='reviewAssetRequestButtonsDiv'>
                        <button className='reviewAssetRequestApproveButton' onClick={() => console.log('Asset Request Accepted')}>Accept</button>
                        <button className='reviewAssetRequestRejectButton' onClick={() => console.log('Asset Request Rejected')}>Reject</button>
                    </div>
                </div>
            </div>
        </Popup>
    );

}

export default ReviewAssetRequest;