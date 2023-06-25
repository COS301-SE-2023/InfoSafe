import React from 'react';
import '../Styling/ViewDevice.css';
import Popup from 'reactjs-popup';
import { IoArrowBackOutline } from 'react-icons/io5';

export const ViewDevice = ({ popupOpen, popupClose }) => {
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
                        <textarea readOnly={true} className="viewDescription">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet dolorem
                            dolores est fuga iste iure libero nam nemo nihil non officiis optio,
                            placeat quos ratione, saepe temporibus tenetur, ullam ut.
                        </textarea>
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
