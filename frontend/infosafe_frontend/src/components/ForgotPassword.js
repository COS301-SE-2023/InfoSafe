import "../styling/ForgotPassword.css"

export const ForgotPassword = () => {

    const emailState = () => {
        document.getElementById("emailPanel").style.display = "none";
        document.getElementById("otpPanel").style.display = "inline";
    }
    const otpState = () => {
        document.getElementById("otpPanel").style.display = "none";
        document.getElementById("passwordPanel").style.display = "inline";
    }

    return (
        <div className="background">
            <div className="inputPanel">
            <div className="emailPanel" id="emailPanel">
                <p>Enter your E-Mail:</p>
                <input type="text"/>
                <button className="submit" onClick={emailState}>
                    Submit
                </button>
            </div>
            <div className="otpPanel" id="otpPanel">
                <p>Enter OTP:</p>
                <input type="text"/>
                <button className="submit" onClick={otpState}>
                    Submit
                </button>
            </div>
            <div className="passwordPanel" id="passwordPanel">
                <p>Enter new password:</p>
                <input type="text"/>
                <p>Re-enter new password:</p>
                <input type="text"/>
                <button className="submit">
                    Submit
                </button>
            </div>
            </div>
        </div>
    );
}