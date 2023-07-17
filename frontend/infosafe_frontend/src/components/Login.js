import '../styling/Login.css';
import React, {useState} from 'react';

function Login(){
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const handleLogin = (e) => {
        e.preventDefault()
        const login = {email, password}
        fetch("http://localhost:8080/api/auth/login", {
            method:"POST",
            headers:{"Content-Type":"application/json",
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            },
            body:JSON.stringify(login)
        }).then((response) => {
            //console.log(response);
            if (response.ok) {
                response.json().then((data) => {
                    const { access_token } = data;
                    sessionStorage.setItem('accessToken', access_token);
                    console.log("Login successful!");
                    window.location.href = '/home';
                });
            } else {
                //throw new Error('Login failed');
                console.log("Login failed");
            }
        })
    };

    return (
        <div className="background">
            <div className="panel">
                <div className="title">
                    <p className="logo">Login</p>
                </div>
                <div className="user">
                    <p className="username">Username</p>
                    <input
                        data-testid="userIn"
                        className="untxt"
                        type="text"
                        id="username"
                        name="email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    ></input>
                </div>
                <div className="user_password">
                    <p className="pass">Password</p>
                    <input
                        data-testid="passIn"
                        className="pwtxt"
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    ></input>
                </div>

                <a className="forgot">Forgot Password?</a>
                <button data-testid="btnTest" className="btnLogin" onClick={handleLogin}>
                    Login
                </button>
            </div>
        </div>
    );
}

export default Login;
