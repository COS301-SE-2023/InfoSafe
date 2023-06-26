import React from 'react';
import '../Styling/ViewDevice.css';
import Popup from 'reactjs-popup';
import { IoArrowBackOutline } from 'react-icons/io5';

export const ViewDevice = ({ id, popupOpen, popupClose }) => {
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
                        <p className="deviceType">Laptop</p>
                    </div>
                    <div className="viewDeviceDescriptionDiv">
                        <p className="deviceDescriptionLabel">Device Description</p>
                        <textarea
                            readOnly={true}
                            className="viewDescription"
                            defaultValue="Lenovo Ideapad 330
                            RAM: 16GB
                            SDD: 1TB
                            Windows 10 Home"
                        ></textarea>
                    </div>
                    <div className="viewDeviceStatusDiv">
                        <p className="statusLabel">Status</p>
                        <p className="viewStatus">Clean</p>
                    </div>
                    <div className="viewDeviceAssignedDiv">
                        <p className="assignedLabel">Assigned User</p>
                        <p className="viewAssigned">Employee123</p>
                    </div>
                </div>
            </div>
        </Popup>
    );
};
