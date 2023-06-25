import React from "react";
import '../Styling/CreateDevicePopup.css';
import Popup from "reactjs-popup";
import Dropdown from "react-dropdown";

export const CreateDevicePopup = ({ popupOpen, popupClose }) => {
  return (
    <Popup open={popupOpen} onClose={popupClose} position="center center">
      <div className="createDeviceOverlay">
        <div className="createDeviceBorder">
          <form>
            <p className="createDeviceLabel">Add Device</p>
            <p className="deviceTypeLabel">Device Type</p>
            <input className="deviceTypeInput" />
            <p className="deviceDescriptionLabel">Device Description</p>
            <textarea className="deviceDescriptionInput" />
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