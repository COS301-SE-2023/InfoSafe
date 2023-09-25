import React from 'react';
import '../../styling/ViewSupportRequest.css';
import Popup from 'reactjs-popup';
import { IoArrowBackOutline } from 'react-icons/io5';

const ViewSupportRequest = ({ support, popupOpen, popupClose }) => {
    return (
        <Popup open={popupOpen} closeOnDocumentClick={false} position="center center">
            <div className="viewSupportRequestPopup">
                <div className="popupBackground">
                    <div className="viewSupportRequestPopupBorder">
                        <button className="viewSupportRequestBackButton" onClick={popupClose} data-testid="back-button">
                            <IoArrowBackOutline className="viewSupportRequestBackIcon" />
                        </button>
                        <p className="viewSupportRequestTitle">View Support Request</p>
                        <div className="viewSupportRequestContent">
                            <p className="viewSupportRequestTypeLabel">Type of Support Request</p>
                            <p className="viewSupportRequestTypeDisplay">{support.support_type}</p>
                            <p className="viewSupportRequestUserLabel">User</p>
                            <p className="viewSupportRequestUserDisplay">{support.user_id.first_name}</p>
                            <p className="viewSupportRequestDescriptionLabel">Description</p>
                            <textarea
                                className="viewSupportRequestDescriptionDisplay"
                                readOnly={true}
                                defaultValue={support.support_description}
                            ></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </Popup>
    );
};

export default ViewSupportRequest;
