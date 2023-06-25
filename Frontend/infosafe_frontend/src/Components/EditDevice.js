import Popup from 'reactjs-popup';
import React, { useRef } from 'react';
import '../Styling/EditDevice.css';
import Dropdown from 'react-dropdown';
import { IoArrowBackOutline } from 'react-icons/io5';

const EditDevice = ({ closeEditDevice, openEditDevice }) => {
    const status_options = ['AVAILABLE', 'CLEAN', 'UNAVAILABLE', 'BROKEN'];
    const formRef = useRef(null);

    const handleClickOverlay = (event) => {
        if (
            event.target.classList.contains('popup-overlay') ||
            event.target.classList.contains('editDeviceOverlay')
        ) {
            event.stopPropagation();
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        closeEditDevice();
    };

    const handleBackButtonClick = () => {
        closeEditDevice();
    };

    return (
        <Popup
            open={openEditDevice}
            onClose={closeEditDevice}
            closeOnDocumentClick={false}
        >
            <div className="editDeviceOverlay" onClick={handleClickOverlay}>
                <div className="borderEditDevice">
                    <button className="backButton" onClick={handleBackButtonClick}>
                        <IoArrowBackOutline className="backIcon" />
                    </button>
                    <form ref={formRef} onSubmit={handleSubmit}>
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
                                type="text"
                                id="editdevicedescr"
                                name="editdevicedescr"
                            >
                                Description here.
                            </textarea>
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
                        <button className="EditDeviceButton" type="submit">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </Popup>
    );
};

export default EditDevice;
