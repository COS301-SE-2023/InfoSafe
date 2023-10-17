import "../styling/ForgotPassword.css"
import React, {useState} from "react";

export const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const [otpError, setOTPError] = useState("");
    const emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
    const [emailError, setEmailError] = useState("");
    const handleClick = (e) => {
        e.preventDefault();


        if ( !emailRegex.test(email) ){
            setEmailError("Invalid email format");
            return;
        }

        emailState();

        const forgot = {
            email: email
        };
        fetch("https://infosafe.live/api/forgot/request-reset", {

            method: "POST",
            body: JSON.stringify(forgot),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                if (response.ok) {
                    console.log("Email sent");
                } else {
                    response.text().then((errorMessage) => {
                        console.error(errorMessage);
                    });
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const verifyOtp = () => {
        const otpData = { email: email, otp: otp };
        fetch("https://infosafe.live/api/forgot/verify-otp", {
            method: "POST",
            body: JSON.stringify(otpData),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                if (response.ok) {
                    console.log("OTP verified");
                    setIsOtpVerified(true);
                    document.getElementById("otpPanel").style.display = "none";
                    document.getElementById("passwordPanel").style.display = "inline";
                } else {
                    response.text().then((errorMessage) => {
                        console.error(errorMessage);
                        console.log("OTP not valid");
                    });
                }
            })
            .catch((error) => {
                console.error(error);
                console.log("OTP verification failed");
                setOTPError("OTP is not valid");
            });
    }

    const handleSecondClick = (e) => {

        e.preventDefault();

        if (newPassword !== confirmPassword) {
            console.log("Passwords do not match.");
            return;
        }
        const forgot = { email: email, otp: otp, newPassword: newPassword };
        fetch("https://infosafe.live/api/forgot/reset-password", {

            method: "POST",
            body: JSON.stringify(forgot),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                if (response.ok) {
                    console.log("Password changed");
                    window.location.href = "/";
                } else {
                    response.text().then((errorMessage) => {
                        console.error(errorMessage);
                    });
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }
    const emailState = () => {
        document.getElementById("emailPanel").style.display = "none";
        document.getElementById("otpPanel").style.display = "inline";
    }
    const otpState = () => {
        verifyOtp()
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleOtpChange = (event) => {
        setOtp(event.target.value);
    };

    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    }

    return (
        <div className='background'>
            <div className='inputPanel'>
                <p className="forgotPageTitle">Forgot Password</p>
                <div className='emailPanel' id='emailPanel'>
                    <p className="emailTitle">Enter your E-Mail:</p>
                    <input type='email' value={email} onChange={handleEmailChange} className="forgotEmail"/>
                    <p className="emailError">{emailError}</p>
                    <button className='submit' onClick={handleClick}>
                        Submit
                    </button>
                </div>
                <div className='otpPanel' id='otpPanel'>
                    <p className="otpTitle">Enter OTP:</p>
                    <input type='text' value={otp} onChange={handleOtpChange} className="forgotOTP"/>
                    <p className="otpError">{otpError}</p>
                    <button className='submit' onClick={otpState}>
                        Submit
                    </button>
                </div>
                <div className='passwordPanel' id='passwordPanel'>
                    <p className="passTitle">Enter new password:</p>
                    <input type='password' value={newPassword} onChange={handleNewPasswordChange} className="forgotPass"/>
                    <p className="rePassTitle">Re-enter new password:</p>
                    <input type='password' value={confirmPassword} onChange={handleConfirmPasswordChange} className="forgotRePass"/>
                    <button className='submit' onClick={handleSecondClick}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;