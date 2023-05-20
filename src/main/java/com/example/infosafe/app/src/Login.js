import logo from './logo.svg';
import './Login.css';
import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

function Login() {
  return (
      <div className="background">
          <div className="panel">
              <span className="logo">LOGIN</span>
              <span className="username">Username</span><br/>
              <input placeholder="Type in email" className="untxt" type="text" id="username" name="username"></input><br/>
              <span className="password">Password</span>
              <input placeholder="Type in password" className="pwtxt" type="text" id="password" name="password"></input><br/>
              <a className="forgot">Forgot Password?</a>
              <button className="btnLogin">Login</button>
          </div>
      </div>
  );
}

export default Login;
