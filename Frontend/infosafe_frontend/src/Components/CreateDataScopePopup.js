import React from 'react';
import '../Styling/CreateDataScopePopup.css';
import Popup from 'reactjs-popup';

export const CreateDataScopePopup = ({ popupOpen, popupClose }) => {
    return (
        <Popup open={popupOpen} closeOnDocumentClick={false} position="center center">
            <div className="createDataScopeOverlay">
                <div className="createdatascopeBorder">
                    <form>
                        <p className="datascopeLabel">Data Scope Creation</p>
                        <p className="datascopeNameLabel">Name</p>
                        <input className="datascopeNameInput" />
                        <p className="descriptionLabel">Description</p>
                        <textarea className="descriptionInput" />
                        <br />
                        <button className="datascope_finish" onClick={popupClose}>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </Popup>
    );
};
