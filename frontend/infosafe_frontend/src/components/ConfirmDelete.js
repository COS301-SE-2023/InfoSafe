import React from "react";
import Popup from "reactjs-popup";
import "../styling/ConfirmDelete.css"

export const ConfirmDelete = ({popupClose, popupOpen, yesDelete}) => {
    const confirm = () =>{
        yesDelete();
        popupClose();
    }


    return(
        <Popup open={popupOpen} closeOnDocumentClick={false}>
            <div className="deleteOverlay">
                <div className="deleteBackground">
                    <div className="borderDelete">
                        <p className="deleteTitle">Confirm Delete</p>
                            <p className="deleteMessage">Are you sure?</p>
                            <div className="confirmationButtons">
                                <button  className="yesButton" data-testid="confirmDelete" onClick={confirm}>Yes</button>
                                <button className="noButton" onClick={popupClose}>No</button>
                            </div>
                    </div>
                </div>
            </div>
        </Popup>

    )
}