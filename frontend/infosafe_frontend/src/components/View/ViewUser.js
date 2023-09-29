import Popup from 'reactjs-popup';
import React from 'react';
import '../../styling/ViewUser.css';
import { IoArrowBackOutline } from 'react-icons/io5';

const ViewUser = ({ user, popupClose, popupOpen }) => {
    return (
        <Popup data-testid="viewUser"
            open={popupOpen}
            onClose={popupClose}
            closeOnDocumentClick={false}
            position="center center"
        >
            <div className="viewUserOverlay">
                <div className="popupBackground">
                    <div className="borderView">
                        <button className="viewUserBackButton" onClick={popupClose} data-testid="back-button">
                            <IoArrowBackOutline className="viewUserBackIcon" />
                        </button>
                        <p className="viewUserTitle">View User</p>
                        <div className="viewUserContent">
                            <div className="view_name">
                                <p className="nameDisplay">Name</p>
                                <p className="viewName">{user.first_name}</p>
                            </div>
                            <div className="view_surname">
                                <p className="surnameDisplay">Surname</p>
                                <p className="viewSurname">{user.last_name}</p>
                            </div>
                            <div className="view_email">
                                <p className="emailDisplay">Email</p>
                                <p className="viewEmail">{user.email}</p>
                            </div>
                            <div className="view_role">
                                <p className="viewUserRoleDisplay">System Role</p>
                                <p className="viewRole">{user.role.role_name}</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </Popup>
    );
};

export default ViewUser;
