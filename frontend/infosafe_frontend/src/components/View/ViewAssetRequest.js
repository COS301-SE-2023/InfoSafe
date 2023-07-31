import React from 'react';
import '../../styling/ViewAssetRequest.css';
import Popup from 'reactjs-popup';
import { IoArrowBackOutline } from 'react-icons/io5';
/* eslint-disable react/prop-types */
/* eslint-disable  no-unused-vars */

const ViewAssetRequest = ({asset, popupOpen, popupClose}) => {
    return (
        <Popup open={popupOpen} closeOnDocumentClick={false} position= "center center">
            <div className="viewAssetRequestOverlay">
                <div className="viewAssetRequestBorder">
                    <button className="viewAssetRequestBackButton" onClick={popupClose}>
                        <IoArrowBackOutline className="viewAssetRequestBackIcon" />
                    </button>
                    <p className="viewAssetRequestLabel">View Asset Request</p>
                    <p className="viewAssetRequestDeviceNameLabel">Device Name</p>
                    <p className="viewAssetRequestDeviceName">{asset.asset_id}</p>
                    <p className="viewAssetRequestUserLabel">User</p>
                    <p className="viewAssetRequestUser">{asset.user_id}</p>
                    <p className="viewAssetRequestReasonLabel">Reason</p>
                    <textarea className="viewAssetRequestReason" readOnly={true} defaultValue={asset.reason}></textarea>
                    <p className="viewAssetRequestDateRequiredLabel">Date Required</p>
                    <p className="viewAssetRequestDateRequired">{asset.desired_date}</p>
                </div>
            </div>
        </Popup>
    );

}

export default ViewAssetRequest;