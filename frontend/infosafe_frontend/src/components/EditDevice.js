import Popup from 'reactjs-popup';
import React from 'react';
import '../styling/EditDevice.css';
import { IoArrowBackOutline } from 'react-icons/io5';
import Dropdown from 'react-dropdown';

const STATUS_OPTIONS = ['CLEAN', 'FULL', 'BROKEN'];
// const NEW_OPTIONS = ['YES', 'NO'];
const AVAILABILITY_OPTIONS = ['YES', 'NO'];
const EditDevice = ({ asset, popupClose, popupOpen }) => {
    // const makeOptions = () => {
    //     var options = [];
    //     STATUS_OPTIONS.map((opt) => options.push(<option>{opt}</option>));
    //     return options;
    // };

    return (
        <Popup open={popupOpen} closeOnDocumentClick={false}>
            <div className="editDeviceOverlay">
                <div className="borderEditDevice">
                    <button className="backButton" onClick={popupClose}>
                        <IoArrowBackOutline className="backIcon" />
                    </button>
                    <form>
                        <p className="editDeviceTitle">Edit Device</p>

                        <div className="editDeviceDescriptionDiv">
                            <p className="editDeviceDescriptionLabel">Description</p>
                            <textarea
                                className="editDeviceDescriptionInput"
                                defaultValue={asset.asset_description}
                            />
                        </div>
                        <p className = "editDeviceAvailabilityLabel">Available</p>
                        <Dropdown
                            options={AVAILABILITY_OPTIONS}
                            value={AVAILABILITY_OPTIONS[0]}
                            className="editDeviceAvailableDropdown"
                            // name="status"
                            // onChange={(selectedOption) => setStatus(selectedOption.value)}
                        />
                        <div className="editDeviceStatusDiv">
                            <p className="editDevicestatusTitle">Status</p>
                            <Dropdown
                                options={STATUS_OPTIONS}
                                value={asset.status}
                                className="editDeviceStatusDropdown"
                                name="editDeviceStatusDropdown"
                            />
                        </div>
                        <p className="editDeviceCurrentCustodianLabel">Current Custodian</p>
                        <input
                            className="editDeviceCurrentCustodianInput"
                            // value={assignee}
                            // onChange={(e) => setAssignee(e.target.value)}
                        />
                        <p className="editDevicePreviousCustodianLabel">Previous Custodian</p>
                        <input
                            className="editDevicePreviousCustodianInput"
                            // value={assignee}
                            // onChange={(e) => setAssignee(e.target.value)}
                        />
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
