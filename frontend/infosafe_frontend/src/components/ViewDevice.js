import React from 'react';
import '../styling/ViewDevice.css';
import Popup from 'reactjs-popup';
import { IoArrowBackOutline } from 'react-icons/io5';
/* eslint-disable react/prop-types */
/* eslint-disable  no-unused-vars */
export const ViewDevice = ({ asset, popupOpen, popupClose }) => {
    return (
        <Popup open={popupOpen} closeOnDocumentClick={false} position="center center">
            <div className="viewDeviceOverlay">
                <div className="viewDeviceBorder">
                    <button className="backButton" onClick={popupClose}>
                        <IoArrowBackOutline className="backIcon" />
                    </button>
                    <p className="viewDeviceLabel">View Device</p>
                    <p className="viewDeviceNameLabel">Device Name</p>
                    <p className="viewDeviceName">Device A</p>
                    <p className="viewDeviceTypeLabel">Device Type</p>
                    <p className="viewDeviceType">Laptop</p>
                    <p className="viewDeviceDescriptionLabel">Device Description</p>
                    <textarea className="viewDeviceDescription" readOnly={'true'} defaultValue={"Device description here"}/>
                    <p className = "viewDeviceNewLabel">New</p>
                    <p className = "viewDeviceNew">No</p>
                    <p className = "viewDeviceAvailabilityLabel">Available</p>
                    <p className = "viewDeviceAvailability">No</p>
                    <p className="viewDeviceStatusLabel">Status</p>
                    <p className="viewDeviceStatus">Full</p>
                    <p className="viewDeviceCurrentCustodianLabel">Current Custodian</p>
                    <p className="viewDeviceCurrentCustodian">User 5</p>
                    <p className="viewDevicePreviousCustodianLabel">Current Custodian</p>
                    <p className="viewDevicePreviousCustodian">Storage</p>

                </div>
            </div>
        </Popup>
    );
};
