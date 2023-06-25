import React from 'react';
import '../Styling/CreateDevicePopup.css';
import Popup from 'reactjs-popup';
import Dropdown from 'react-dropdown';
import { IoArrowBackOutline } from 'react-icons/io5';

export const CreateDevicePopup = ({ popupOpen, popupClose }) => {
    const status_options = ['CLEAN', 'FULL', 'BROKEN'];
    return (
        <Popup open={popupOpen} closeOnDocumentClick={false} position="center center">
            <div className="createDeviceOverlay">
                <div className="createDeviceBorder">
                    <button className="backButton" onClick={popupClose}>
                        <IoArrowBackOutline className="backIcon" />
                    </button>
                    <form>
                        <p className="createDeviceLabel">Add Device</p>
                        <p className="deviceTypeLabel">Device Type</p>
                        <input className="deviceTypeInput" />
                        <p className="deviceDescriptionLabel">Device Description</p>
                        <textarea className="deviceDescriptionInput" />
                        <p className="deviceStatusLabel">Status</p>
                        <Dropdown
                            options={status_options}
                            value={status_options[0]}
                            className="statusDropdown"
                            name="status"
                        />
                        <br />
                        <button className="createDevice_finish" onClick={popupClose}>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </Popup>
    );
};
