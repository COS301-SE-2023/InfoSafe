import Popup from 'reactjs-popup';
import React from 'react';
import '../Styling/EditDevice.css';
import Dropdown from 'react-dropdown';
import { IoArrowBackOutline } from 'react-icons/io5';

const EditDevice = ({ id, popupClose, popupOpen}) => {
    const status_options = ['CLEAN', 'FULL', 'BROKEN'];

    return (
        <Popup open={popupOpen} closeOnDocumentClick={false}>
            <div className="editDeviceOverlay">
                <div className="borderEditDevice">
                    <button className="backButton" onClick={popupClose}>
                        <IoArrowBackOutline className="backIcon" />
                    </button>
                    <form>
                        <p className="editDeviceTitle">Edit Device</p>
                        <div className="devicetypeEdit">
                            <p className="devicetypeTitle">Type</p>
                            <input
                                className="editdeviceTypeInput"
                                type="text"
                                id="editdevicetype"
                                name="editdevicetype"
                                defaultValue="Tablet"
                            />
                        </div>
                        <div className="devicedescriptionEdit">
                            <p className="devicedescriptionTitle">Description</p>
                            <textarea
                                className="editdeviceDescriptionInput"
                                defaultValue="Description here."
                            />
                        </div>
                        <div className="devicestatusEdit">
                            <p className="devicestatusTitle">Status</p>
                            <Dropdown
                                options={status_options}
                                value={status_options[0]}
                                className="statusDropdown"
                                name="status"
                            />
                        </div>
                        <div className="deviceuserEdit">
                            <p className="deviceuserTitle">Assigned User</p>
                            <input
                                className="editdeviceUserInput"
                                type="text"
                                id="editdeviceuser"
                                name="editdeviceuser"
                                defaultValue="Employee123"
                            />
                        </div>
                        <button
                            className="EditDeviceButton"
                            type="submit"
                            onClick={popupClose}
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </Popup>
    );
};

export default EditDevice;
