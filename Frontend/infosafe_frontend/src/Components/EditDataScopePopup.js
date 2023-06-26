import React from 'react';
import '../Styling/EditDataScopePopup.css';
import Popup from 'reactjs-popup';
import Dropdown from 'react-dropdown';
import { IoArrowBackOutline } from 'react-icons/io5';

const status = ['CREATED', 'APPROVED', 'REJECTED', 'REVOKED'];
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
                        <input className="editDatascopeNameInput" defaultValue={datascope.ds_name}/>
                        <p className="editDescriptionLabel">Description</p>
                        <textarea className="editDescriptionInput" defaultValue={datascope.description}/>
                        <br />
                        <p className="editStatusLabel">Status</p>
                        <Dropdown
                            options={status}
                            value={status[0]}
                            className="status"
                            name="status"
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
