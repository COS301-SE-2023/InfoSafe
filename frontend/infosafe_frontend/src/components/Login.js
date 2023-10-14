import "../styling/Login.css";
import React, {useState} from "react";

function Login(){
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const [errMsg , setErrMsg] = useState("");
    const emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
    const handleLogin = (e) => {
        e.preventDefault()

        if ( !emailRegex.test(email) ){
            setErrMsg("Invalid email format");
            return;
        }

        const login = {email, password}
        fetch("http://localhost:8080/api/auth/login", {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(login)
        }).then((response) => {
            //console.log(response);
            if (response.ok) {
                response.json().then((data) => {
                    const { access_token } = data;
                    sessionStorage.setItem("accessToken", access_token);
                    console.log("Login successful!");
                    window.location.href = "/home";
                });
            } else {
                setErrMsg("Invalid login credentials");
            }
        })
    };

    const submitLogin = e => {
        if (e.key === "Enter")
        {
            document.getElementById("btnLogin").click();
        }

    };

    const forgot = () =>{
        window.location.href = "/ForgotPassword";
    }


    return (
        <div className='background'>
            {/*<div className='flipPanel'>*/}
            {/*    <div className='panel'>*/}
            {/*        <div className='panelFront'></div>*/}
                    <div className='panelBack'>
                        <div className='title'>
                            <p className='loginTitle'>Login</p>
                        </div>
                        <div className='credentials'>
                            <div className='user'>
                                <p className='username'>Username</p>
                                <input
                                    data-testid='userIn'
                                    className='untxt'
                                    type='text'
                                    id='username'
                                    name='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                ></input>
                            </div>
                            <div className='user_password'>
                                <p className='pass'>Password</p>
                                <input
                                    data-testid='passIn'
                                    className='pwtxt'
                                    type='password'
                                    id='password'
                                    name='password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onKeyPress={submitLogin}
                                ></input>
                            </div>
                            <p className="loginError" id="loginError">{errMsg}</p>
                        </div>
                        <href className='forgot' onClick={forgot} >Forgot Password?</href>
                        <button data-testid='btnTest'  id='btnLogin' className='btnLogin' onClick={handleLogin}>
                            Login
                        </button>
                    </div>
                {/*</div>*/}
            {/*</div>*/}
        </div>
    );
}

export default Login;
