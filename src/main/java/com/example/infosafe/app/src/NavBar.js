import "./NavBar.css"
import React, { useState } from "react";

export default function NavBar(){
    const [content, setContent] = useState("");
    const handleClick = (content) => {
        // eslint-disable-next-line default-case
        switch(content){
            case "users":
                setContent(users());
                break;
            case "data":
                setContent(data());
                break;
            case "access":
                setContent(access());
                break;
            case "compliance":
                setContent(compliance());
                break;
            case "devices":
                setContent(devices());
                break;
            case "support":
                setContent(support());
                break;
            case "risks":
                setContent(risks());
                break;
        }
    };

    const users = () =>{
        return "<body>Users</body>";
    }
    
    const data = () =>{
        return "<body>data</body>";
    }

    const access = () =>{
        return "<body>access</body>";
    }

    const compliance = () =>{
        return "<body>compliance</body>";
    }

    const devices = () =>{
        return "<body>devices</body>";
    }

    const support = () =>{
        return "<body>support</body>";
    }

    const risks = () =>{
        return "<body>risks</body>";
    }


    return<div className="home">
        <nav className="nav">
        <ul>
            <li><button onClick={() => handleClick("users")}>Users</button></li>
            <li><button onClick={() => handleClick("data")}>Data Scopes</button></li>
            <li><button onClick={() => handleClick("access")}>Access Requests</button></li>
            <li><button onClick={() => handleClick("compliance")}>Compliance Matrix</button></li>
            <li><button onClick={() => handleClick("devices")}>Devices</button></li>
            <li><button onClick={() => handleClick("support")}>Support Requests</button></li>
            <li><button onClick={() => handleClick("risks")}>Risks</button></li>
        </ul>
    </nav>
    <div className="display" id="display" dangerouslySetInnerHTML={{ __html: content }}></div>
    </div>
    
}



