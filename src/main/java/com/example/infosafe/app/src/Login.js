import logo from './logo.svg';
import './Login.css';
import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

function Login() {
  return (
      <div className="background">
          <div className="panel">

            <div className="title">
                <p className="logo">Login</p>
            </div>
            <div className="user">
                <p className="username">Username</p>
                <input  className="untxt" type="text" id="username" name="username"></input>
            </div>
            <div className = "user_password">
                <p className="password">Password</p>
                <input className="pwtxt" type="password" id="password" name="password"></input>
            </div>
        
            <a className="forgot">Forgot Password?</a>
            <button className="btnLogin">Login</button>         
        </div>
    </div>
  );
}

export default Login;
