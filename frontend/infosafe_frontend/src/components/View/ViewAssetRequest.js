import React from 'react';
import '../../styling/ViewAssetRequest.css';
import Popup from 'reactjs-popup';
import { IoArrowBackOutline } from 'react-icons/io5';
/* eslint-disable react/prop-types */
/* eslint-disable  no-unused-vars */

const ViewAssetRequest = ({assetRequest, popupOpen, popupClose}) => {
    return (
        <Popup open={popupOpen} closeOnDocumentClick={false} position= "center center">
            <div className="viewAssetRequestOverlay">
                <div className="popupBackground">
                <div className="viewAssetRequestBorder">
                    <button className="viewAssetRequestBackButton" onClick={popupClose} data-testid="back-button">
                        <IoArrowBackOutline className="viewAssetRequestBackIcon" />
                    </button>
                    <p className="viewAssetRequestLabel">View Asset Request</p>
                    <div className="viewAssetRequestContent">
                    <p className="viewAssetRequestDeviceNameLabel">Device Name</p>
                    <p className="viewAssetRequestDeviceName">{assetRequest.asset.asset_name}</p>
                    <p className="viewAssetRequestUserLabel">User</p>
                    <p className="viewAssetRequestUser">{assetRequest.user.first_name} {assetRequest.user.last_name}</p>
                    <p className="viewAssetRequestReasonLabel">Reason</p>
                    <textarea className="viewAssetRequestReason" readOnly={true} defaultValue={assetRequest.reason}></textarea>
                    <p className="viewAssetRequestDateRequiredLabel">Date Required</p>
                    <p className="viewAssetRequestDateRequired">{assetRequest.desired_date}</p>
                </div>
                </div>
            </div>
            </div>
        </Popup>
    );

}

export default ViewAssetRequest;