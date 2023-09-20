import React from "react";
import Popup from "reactjs-popup";
import {IoArrowBackOutline} from "react-icons/io5";
import '../../styling/ChangePassword.css';

export const ChangePassword = ({ popupClose, popupOpen }) => {

    return (
        <Popup open={popupOpen} closeOnDocumentClick={false}>
            <div className="changePassOverlay">
                <div className="borderChangePass">
                    <button className="backButton" onClick={popupClose} data-testid="back-button">
                        <IoArrowBackOutline className="backIcon" />
                    </button>
                    <form>
                        <p className="pageTitle">Change Password</p>
                        <p className="inputTitle">Enter Password</p>
                        <input type="text" className="inputText" name="newPass"/>
                        <p className="inputTitle">Re-Enter Password</p>
                        <input type="text" className="inputText" name="reNewPass"/>
                        <div>
                            <button className="submitButton" type="submit">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Popup>
    );
};

export default ChangePassword;
