/* eslint-disable jsx-a11y/anchor-is-valid */
import '../Styling/Login.css';
import React, {useState} from 'react';

function Login(){
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    const handleLogin = (e) => {
        e.preventDefault()
        const login = {email, password}
        console.log(login)
        fetch("http://localhost:8080/user/login", {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(login)
        }).then(()=>{
            console.log("User logged in")
        }).catch(() =>{
            console.log("User not logged in")
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
