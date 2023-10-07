import "../styling/ForgotPassword.css"
import React, {useState} from "react";

export const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const handleClick = (e) => {
        emailState()
        e.preventDefault();
        const forgot = {email, otp, newPassword};

        fetch("http://localhost:8080/api/forgot/request-reset", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + sessionStorage.getItem("accessToken")
            },
            body: JSON.stringify(forgot)
        }).then((response) => {
            if (response.ok) {
                console.log("Email sent");
                // need to add success message
            } else {
                response.text().then((errorMessage) => {
                    // error message here
                    console.error(errorMessage);
                });
            }
        })
            .catch((error) => {
                console.error(error);
            });
    }
    const handleSecondClick = (e) => {
        const forgot = {email, otp, newPassword};
        fetch("http://http://localhost:8080/api/forgot/reset-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + sessionStorage.getItem("accessToken")
            },
            body: JSON.stringify(forgot)
        }).then((response) => {
            if (response.ok) {
                console.log("Password changed");
                // need to add success message
            } else {
                response.text().then((errorMessage) => {
                    // error message here
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
        document.getElementById("otpPanel").style.display = "none";
        document.getElementById("passwordPanel").style.display = "inline";
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

    return (
        <div className='background'>
            <div className='inputPanel'>
                <div className='emailPanel' id='emailPanel'>
                    <p className="emailTitle">Enter your E-Mail:</p>
                    <input type='text' value={email} onChange={handleEmailChange} className="forgotEmail"/>
                    <button className='submit' onClick={handleClick}>
                        Submit
                    </button>
                </div>
                <div className='otpPanel' id='otpPanel'>
                    <p className="otpTitle">Enter OTP:</p>
                    <input type='text' value={otp} onChange={handleOtpChange} className="forgotOTP"/>
                    <button className='submit' onClick={otpState}>
                        Submit
                    </button>
                </div>
                <div className='passwordPanel' id='passwordPanel'>
                    <p className="passTitle">Enter new password:</p>
                    <input type='text' value={newPassword} onChange={handleNewPasswordChange} className="forgotPass"/>
                    <p className="rePassTitle">Re-enter new password:</p>
                    <input type='text' className="forgotRePass"/>
                    <button className='submit' onClick={handleSecondClick}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );

}

export default ForgotPassword;