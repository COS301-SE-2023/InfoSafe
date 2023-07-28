import React from 'react';
import '../../styling/EditDataScopePopup.css';
import Popup from 'reactjs-popup';
import { IoArrowBackOutline } from 'react-icons/io5';
/* eslint-disable react/prop-types */
/* eslint-disable  no-unused-vars */
import Dropdown from 'react-dropdown';
const STATUS = ['CREATED', 'APPROVED', 'REJECTED', 'REVOKED'];


export const EditDataScopePopup = ({ datascope, popupOpen, popupClose }) => {
    return (
        <Popup open={popupOpen} closeOnDocumentClick={false} position="center center">
            <div className="editDataScopeOverlay">
                <div className="editdatascopeBorder">
                    <form>
                        <button className="backButton" onClick={popupClose}>
                            <IoArrowBackOutline className="backIcon" />
                        </button>
                        <p className="editDatascopeLabel">Edit Data Scope</p>
                        <p className="editDatasscopeNameLabel">Name</p>
                        <input
                            className="editDatascopeNameInput"
                            defaultValue={datascope.ds_name}
                        />
                        <p className="editDescriptionLabel">Description</p>
                        <textarea
                            className="editDescriptionInput"
                            defaultValue={datascope.description}
                        />
                        <br />
                        <p className="editStatusLabel">Status</p>
                        <Dropdown
                            options={STATUS}
                            value={STATUS[0]}
                            className="editDSStatusDropdown"
                            data-testid="editDSStatusDropdown"

                            //onChange={(selectedOption) => setRole(selectedOption.value)}
                        />
                        <button className="editdatascope_finish" onClick={popupClose}>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </Popup>
    );
};
