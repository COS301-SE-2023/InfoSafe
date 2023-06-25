import Popup from 'reactjs-popup';
import React from 'react';
import '../Styling/ViewUser.css';
import { IoArrowBackOutline } from 'react-icons/io5';

const ViewUser = ({ popupClose, popupOpen }) => {
    return (
        <Popup
            open={popupOpen}
            onClose={popupClose}
            closeOnDocumentClick={false}
            position="center center"
        >
            <div className="viewUserOverlay">
                <div className="borderView">
                    <button className="backButton" onClick={popupClose}>
                        <IoArrowBackOutline className="backIcon" />
                    </button>
                    <p className="viewUserTitle">View User</p>
                    <div className="view_name">
                        <p className="nameDisplay">Name</p>
                        <p className="viewName">Jane</p>
                    </div>
                    <div className="view_surname">
                        <p className="surnameDisplay">Surname</p>
                        <p className="viewSurname">Doe</p>
                    </div>
                    <div className="view_email">
                        <p className="emailDisplay">Email</p>
                        <p className="viewEmail">jane.doe@example.com</p>
                    </div>
                    <div className="view_role">
                        <p className="roleDisplay">System Role</p>
                        <p className="viewRole">Employee</p>
                    </div>
                </div>
            </div>
        </Popup>
    );
};

export default ViewUser;
