import Popup from 'reactjs-popup';
import React from 'react';
import '../Styling/EditDevice.css';
import { IoArrowBackOutline } from 'react-icons/io5';
import Dropdown from "react-dropdown";

const status_options = ['CLEAN', 'FULL', 'BROKEN'];

const EditDevice = ({ asset, popupClose, popupOpen }) => {
    const makeOptions = () => {
        var options = [];
        status_options.map((opt) => options.push(<option>{opt}</option>));
        return options;
    };

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
                                defaultValue={asset.asset_name}
                            />
                        </div>
                        <div className="devicedescriptionEdit">
                            <p className="devicedescriptionTitle">Description</p>
                            <textarea
                                className="editdeviceDescriptionInput"
                                defaultValue={asset.asset_description}
                            />
                        </div>
                        <div className="devicestatusEdit">
                            <p className="devicestatusTitle">Status</p>
                            <Dropdown
                                options={status_options}
                                value={asset.status}
                                className="statusDropdown"
                                name="statusDropdown"

                            />
                        </div>
                        <div className="deviceuserEdit">
                            <p className="deviceuserTitle">Assigned User</p>
                            <input
                                className="editdeviceUserInput"
                                type="text"
                                id="editdeviceuser"
                                name="editdeviceuser"
                                defaultValue={asset.assignee}
                            />
                        </div>
                        <button className="EditDeviceButton" type="submit" onClick={popupClose}>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </Popup>
    );
};

export default EditDevice;
