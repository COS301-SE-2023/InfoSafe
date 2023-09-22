import React from 'react';
import '../../styling/ViewDevice.css';
import Popup from 'reactjs-popup';
import { IoArrowBackOutline } from 'react-icons/io5';
import ViewDataScope from "./ViewDataScope";
/* eslint-disable react/prop-types */
/* eslint-disable  no-unused-vars */
export const ViewDevice = ({ asset, popupOpen, popupClose }) => {
    return (
        <Popup open={popupOpen} closeOnDocumentClick={false} position="center center">
            <div className="viewDeviceOverlay">
                <div className="popupBackground">
                    <div className="viewDeviceBorder">
                        <button className="viewDeviceBackButton" onClick={popupClose} data-testid="back-button">
                            <IoArrowBackOutline className="viewDeviceBackIcon" />
                        </button>
                        <p className="viewDeviceLabel">View Device</p>
                        <p className="viewDeviceNameLabel">Device Name</p>
                        <p className="viewDeviceName">{asset.asset_name}</p>
                        <p className="viewDeviceTypeLabel">Device Type</p>
                        <p className="viewDeviceType">{asset.device_type}</p>
                        <p className="viewDeviceDescriptionLabel">Device Description</p>
                        <p className="viewDeviceDescription">{asset.asset_description}</p>
                        <p className = "viewDeviceNewLabel">New</p>
                        <p className = "viewDeviceNew">{asset.used}</p>
                        <p className = "viewDeviceAvailabilityLabel">Available</p>
                        <p className = "viewDeviceAvailability">{asset.availability}</p>
                        <p className="viewDeviceStatusLabel">Status</p>
                        <p className="viewDeviceStatus">{asset.status}</p>
                        <p className="viewDeviceCurrentCustodianLabel">Current Custodian</p>
                        <p className="viewDeviceCurrentCustodian">{asset.current_assignee}</p>
                        <p className="viewDevicePreviousCustodianLabel">Previous Custodian</p>
                        <p className="viewDevicePreviousCustodian">{asset.previous_assignee}</p>
                    </div>
                </div>
            </div>
        </Popup>
    );
};

export default ViewDevice;
