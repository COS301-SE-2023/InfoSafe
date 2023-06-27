import React from 'react';
import '../Styling/ViewDevice.css';
import Popup from 'reactjs-popup';
import { IoArrowBackOutline } from 'react-icons/io5';

export const ViewDevice = ({ asset, popupOpen, popupClose }) => {
    return (
        <Popup open={popupOpen} closeOnDocumentClick={false} position="center center">
            <div className="viewDeviceOverlay">
                <div className="viewDeviceBorder">
                    <button className="backButton" onClick={popupClose}>
                        <IoArrowBackOutline className="backIcon" />
                    </button>
                    <p className="viewDeviceTitle">View Device</p>
                    <div className="viewDeviceTypeDiv">
                        <p className="deviceTypeLabel">Device Type</p>
                        <p className="deviceType">{asset.asset_name}</p>
                    </div>
                    <div className="viewDeviceDescriptionDiv">
                        <p className="deviceDescriptionLabel">Device Description</p>
                        <textarea
                            readOnly={true}
                            className="viewDescription"
                            defaultValue={asset.asset_description}
                        ></textarea>
                    </div>
                    <div className="viewDeviceStatusDiv">
                        <p className="statusLabel">Status</p>
                        <p className="viewStatus">{asset.status}</p>
                    </div>
                    <div className="viewDeviceAssignedDiv">
                        <p className="assignedLabel">Assigned User</p>
                        <p className="viewAssigned">{asset.assignee}</p>
                    </div>
                </div>
            </div>
        </Popup>
    );
};
