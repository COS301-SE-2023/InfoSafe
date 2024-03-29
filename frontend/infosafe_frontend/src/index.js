import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Home from "./components/Subsystems/Home.js";
import Login from "./components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import {ForgotPassword} from "./components/ForgotPassword";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <Routes>
            <Route index element={<Login />} />
            <Route path='/Home' element={<Home />} />
            <Route path='/ForgotPassword' element={<ForgotPassword/>} />
        </Routes>
    </BrowserRouter>
);

reportWebVitals();
