import "../styling/ForgotPassword.css"

export const ForgotPassword = () => {

    const emailState = () => {
        document.getElementById("emailPanel").style.display = "none";
        document.getElementById("otpPanel").style.display = "block";
    }
    const otpState = () => {
        document.getElementById("otpPanel").style.display = "none";
        document.getElementById("passwordPanel").style.display = "block";
    }

    return (
        <div className="background">
            <div className="inputPanel">
                <div className="title">
                    <p className="forgotTitle">
                        FORGOT PASSWORD
                    </p>
                </div>
            <div className="emailPanel" id="emailPanel">
                <p className="emailTitle">Enter your E-Mail:</p>
                <input className="forgotEmail" type="text"/>
                <button className="submit" onClick={emailState}>
                    Submit
                </button>
            </div>
            <div className="otpPanel" id="otpPanel">
                <p className="otpTitle">Enter OTP:</p>
                <input className="forgotOTP" type="text"/>
                <button className="submit" onClick={otpState}>
                    Submit
                </button>
            </div>
            <div className="passwordPanel" id="passwordPanel">
                <p className="passTitle">Enter new password:</p>
                <input className="forgotPass" type="text"/>
                <p className="rePassTitle">Re-enter new password:</p>
                <input className="forgotRePass" type="text"/>
                <button className="submit">
                    Submit
                </button>
            </div>
            </div>
        </div>
    );
}