import Popup from 'reactjs-popup';
import React from 'react';
import Dropdown from 'react-dropdown';
import '../styling/EditAccessRequest.css';
import { IoArrowBackOutline } from 'react-icons/io5';
/* eslint-disable react/prop-types */
/* eslint-disable  no-unused-vars */

const EditAccessRequest = ({ popupClose, popupOpen }) => {
    const ACCESSREQUESTSTATUSOPTIONS = ['LOGGED', 'APPROVED', 'REJECTED'];
    return (
        <Popup open={popupOpen} closeOnDocumentPopup={false} position="center center">
            <div className="editAccessRequestPopup">
                <div className="editAccessRequestPopupBorder">
                    <button className="editAccessRequestBackButton" onClick={popupClose}>
                        <IoArrowBackOutline className="editAccessRequestBackIcon" />
                    </button>
                    <form>
                        <p className="editAccessRequestTitle">Edit Access Request</p>
                        <div className="editAccessRequestStatusDiv">
                            <p className="editAccessRequestStatusLabel">Status</p>
                            <Dropdown
                                className="editAccessRequestStatusDropdown"
                                options={ACCESSREQUESTSTATUSOPTIONS}
                                value={ACCESSREQUESTSTATUSOPTIONS[0]}
                                //onChange
                                //data-testid
                            />
                        </div>
                        <button
                            className="editAccessRequestButton"
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

export default EditAccessRequest;
