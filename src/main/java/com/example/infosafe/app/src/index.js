import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './Home.js';
import Login from './Login';
import CreateUser from './CreateUser';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import EditProfile from './EditProfile';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route index element={<Home />} />
            <Route index element={<Login />} />
            <Route path="/CreateUser" element={<CreateUser />} />
            <Route path="/EditProfile" element={<EditProfile />} />
        </Routes>
    </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
