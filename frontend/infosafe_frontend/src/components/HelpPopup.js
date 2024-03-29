import Popup from 'reactjs-popup';
import React from 'react';
import {IoArrowBackOutline} from "react-icons/io5";
import "../styling/HelpPopup.css"
export const HelpPopup = ({message, popupOpen, popupClose, image}) => {

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
                            <p  className="helpTitle"></p>
                            <p className="helpMessage">{message}</p>
                            <img src={image} alt={"Help Image"} className="helpImage"/>
                        </div>
                    </div>
                </div>
            </div>
        </Popup>
    )
}