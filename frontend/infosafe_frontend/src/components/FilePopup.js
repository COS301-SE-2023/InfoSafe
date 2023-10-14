import "../styling/FilePopup.css"
import Popup from "reactjs-popup";
import {IoArrowBackOutline} from "react-icons/io5";
import React from "react";
import Dropdown from "react-dropdown";

const FILES = ['FILE1','FILE2','FILE3'];
export const FilePopup = ({popupOpen,popupClose,datascope}) =>{
    return (
        <Popup open={popupOpen} closeOnDocumentClick={false} position="center center">
            <div className="fileOverlay">
                <div className="popupBackground">
                    <div className="fileBorder">
                        <button className="fileBackButton" onClick={popupClose} data-testid={"back-button"}>
                            <IoArrowBackOutline className="backIcon"/>
                        </button>
                        <p className="filePageTitle">Files</p>

                        <p className="fileLabel">Choose File</p>
                        <Dropdown
                            options={FILES}
                            value={FILES[0]}
                            className="fileDropdown"
                            name="createRiskProbabilityDropdown"
                            //onChange={}
                        />
                        <div className="fileButtonsDiv">
                            <button className="fileDownload">
                                Download
                            </button>
                            <button className="fileDelete">
                                Delete
                            </button>
                        </div>
                        <p className="uploadLabel">Upload File</p>
                        <input type="file" className="fileUpload"/>
                    </div>
                </div>
            </div>
        </Popup>
    );
}