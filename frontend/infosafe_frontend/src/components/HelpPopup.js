import Popup from 'reactjs-popup';
import React from 'react';
import {IoArrowBackOutlin, IoArrowBackOutline, IoInformationCircleOutline} from "react-icons/io5";
import "../styling/HelpPopup.css"
export const HelpPopup = ({message, popupOpen, popupClose}) => {

    return(
        <Popup open={popupOpen} closeOnDocumentClick={false}>
            <div className="helpOverlay">
                <div className="popupBackground">
                    <div className="borderHelp">
                        <button className="helpBackButton" onClick={popupClose} data-testid="back-button">
                            <IoArrowBackOutline className="helpBackIcon" />
                        </button>
                        <p className="pageTitle">Help</p>
                        <div className="helpContent">
                            <p  className="helpTitle"><IoInformationCircleOutline></IoInformationCircleOutline></p>
                            <p className="helpMessage">{message}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Popup>
    )
}