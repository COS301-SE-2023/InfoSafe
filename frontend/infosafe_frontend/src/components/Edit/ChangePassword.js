import React, {useEffect, useState} from "react";
import Popup from "reactjs-popup";
import { IoArrowBackOutline } from "react-icons/io5";
import '../../styling/ChangePassword.css';
const passwordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/);


export const ChangePassword = ({ popupClose, popupOpen }) => {
    const [userEmail, setUserEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [reenteredPassword, setReenteredPassword] = useState(''); // Added state for re-entered password

    const change = {newPassword: newPassword };

    const handleClick = async (e) => {
        e.preventDefault();

        if (!passwordRegex.test(newPassword) || !passwordRegex.test(reenteredPassword)) {
            alert("Passwords Need at least one uppercase character, one lowercase character, one number and one special character.");
            return;
        }

        if (newPassword !== reenteredPassword) {
            alert("Passwords do not match. Please re-enter.");
            return;
        }
        try {
            await fetch('https://infosafe.live/api/user/changePassword', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + sessionStorage.getItem('accessToken')
                },
                body: JSON.stringify(change)
            });
            popupClose();
        } catch (error) {
            console.error('Error changing password:', error);
        }
    };

    return (
        <Popup open={popupOpen} closeOnDocumentClick={false}>
            <div className="changePassOverlay">
                <div className="popupBackground">
                <div className="borderChangePass">
                    <button className="changePassBackButton" onClick={popupClose} data-testid={"back-button"}>
                        <IoArrowBackOutline className="changePassBackIcon" />
                    </button>
                    <form>
                        <p className="changePassPageTitle">Change Password</p>
                        <div className="changePassContent">
                            <p className="changePassInputTitle">Enter Password</p>
                            <input
                                type="password"
                                className="changePassInputText"
                                name="newPass"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <p className="changePassInputTitle">Re-Enter Password</p>
                            <input
                                type="password"
                                className="changePassInputText"
                                name="reNewPass"
                                value={reenteredPassword}
                                onChange={(e) => setReenteredPassword(e.target.value)}
                            />
                            <button className="submitButton" type="submit" onClick={handleClick}>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
                </div>
            </div>
        </Popup>
    );
};

export default ChangePassword;
