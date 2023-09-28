import React, {useEffect, useState} from "react";
import Popup from "reactjs-popup";
import { IoArrowBackOutline } from "react-icons/io5";
import '../../styling/ChangePassword.css';
import ViewDataScope from "../View/ViewDataScope";

export const ChangePassword = ({ popupClose, popupOpen }) => {
    const [userEmail, setUserEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [reenteredPassword, setReenteredPassword] = useState(''); // Added state for re-entered password
    const change = { userEmail, newPassword };

    useEffect(() => {

        fetch('https://ec2-174-129-77-195.compute-1.amazonaws.com:8080/api/user/getEmail', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                if (data.email) {
                    setUserEmail(data.email);
                    //console.log(data.email);
                } else {
                    console.error("Email not found in response");
                }
            })
            .catch((error) => {
                console.error('Error fetching email:', error);
            });
    }, []);

    const handleClick = async (e) => {
        e.preventDefault();

        if (newPassword !== reenteredPassword) {
            alert("Passwords do not match. Please re-enter.");
            return;
        }

        try {
            await fetch('https://ec2-174-129-77-195.compute-1.amazonaws.com:8080/api/user/changePassword', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + sessionStorage.getItem('accessToken')
                },
                body: JSON.stringify(change)
            });

            console.log("Updated AccessRequest");
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
