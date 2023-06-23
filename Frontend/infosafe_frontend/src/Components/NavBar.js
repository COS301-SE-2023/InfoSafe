import '../Styling/NavBar.css';
import React, {useEffect, useState} from 'react';

export default function NavBar() {
    const [content, setContent] = useState('');
    const [showUser, setShowUser] = useState(false);
    const [showDevice, setShowDevice] = useState(false);
    const [showSupport, setShowSupport] = useState(false);
    const [showDisplay, setShowDisplay] = useState(false);
    const [showSupportDisplay, setSupportDisplay] = useState(false);

    useEffect(()=>{
        fetch("http://localhost:8080/user/getAll")
            .then(res=>res.json())
            .then((result)=>{
                setShowUser(result);
            })
    },[])

    const handleClick = (content) => {
        // eslint-disable-next-line default-case
        switch (content) {
            case 'users':
                setContent(users());
                setShowDisplay(true);
                setSupportDisplay(false);
                break;
            case 'data':
                setContent(data());
                setShowDisplay(true);
                break;
            case 'access':
                setContent(access());
                setShowDisplay(true);
                setSupportDisplay(false);
                break;
            case 'compliance':
                setContent(compliance());
                setShowDisplay(true);
                setSupportDisplay(false);
                break;
            case 'devices':
                setContent(devices());
                setShowDisplay(true);
                setSupportDisplay(false);
                break;
            case 'support':
                setContent(support());
                setShowDisplay(false);
                setSupportDisplay(true);
                break;
            case 'risks':
                setContent(risks());
                setShowDisplay(true);
                setSupportDisplay(false);
                break;
        }
    };

    const users = () => {
        // setShowUser(true);
        // setShowDevice(false);
        // setShowSupport(false);
        // const userItems = [];
        // for (var i = 1; i < 30; i++) {
        //     userItems.push(<li key={i}>User {i}</li>);
        // }
        // return <ul>{userItems}</ul>;
        const userItems = [];
        {
            users.map(user=>(
                userItems.push(user.name)
            ))
        }
        return <ul>{userItems}</ul>
    };

    const data = () => {
        setShowUser(false);
        setShowDevice(false);
        setShowSupport(false);
        const dataItems = [];
        for (var i = 1; i < 30; i++) {
            dataItems.push(<li key={i}>Data access {i}</li>);
        }
        return <ul>{dataItems}</ul>;
    };

    const access = () => {
        setShowUser(false);
        setShowDevice(false);
        setShowSupport(false);
        const accessItems = [];
        for (var i = 1; i < 30; i++) {
            accessItems.push(<li key={i}>Access Request {i}</li>);
        }
        return <ul>{accessItems}</ul>;
    };

    const compliance = () => {
        setShowUser(false);
        setShowDevice(false);
        setShowSupport(false);
        const complianceItems = [];
        for (var i = 1; i < 30; i++) {
            complianceItems.push(<li key={i}>Compliance Matrix{i}</li>);
        }
        return <ul>{complianceItems}</ul>;
    };

    const devices = () => {
        setShowUser(false);
        setShowDevice(true);
        setShowSupport(false);
        const deviceItems = [];
        for (var i = 1; i < 30; i++) {
            deviceItems.push(<li key={i}>Device {i}</li>);
        }
        return <ul>{deviceItems}</ul>;
    };

    const support = () => {
        setShowUser(false);
        setShowDevice(false);
        setShowSupport(true);
        const supportItem = [];
        for (var k = 1; k < 21; k++) {
            supportItem.push(<li key={k}>Support Request {k}</li>);
        }
        return <ul>{supportItem}</ul>;
    };

    const risks = () => {
        setShowUser(false);
        setShowDevice(true);
        setShowSupport(false);
        const riskItems = [];
        for (var i = 1; i < 30; i++) {
            riskItems.push(<li key={i}>Risk {i}</li>);
        }
        return <ul>{riskItems}</ul>;
    };

    return (
        <div className="home">
            <nav className="nav">
                <ul>
                    <li>
                        <button onClick={() => handleClick('users')}>Users</button>
                    </li>
                    <li>
                        <button onClick={() => handleClick('data')}>Data Scopes</button>
                    </li>
                    <li>
                        <button onClick={() => handleClick('access')}>Access Requests</button>
                    </li>
                    <li>
                        <button onClick={() => handleClick('compliance')}>Compliance Matrix</button>
                    </li>
                    <li>
                        <button onClick={() => handleClick('devices')}>Devices</button>
                    </li>
                    <li>
                        <button onClick={() => handleClick('support')}>Support Requests</button>
                    </li>
                    <li>
                        <button onClick={() => handleClick('risks')}>Risks</button>
                    </li>
                </ul>
            </nav>
            {showDisplay && (
                <div className="display" id="display">
                    {content}
                </div>
            )}
            {showSupportDisplay && (
                <div className="contain">
                    <div className="supp1" title="Active System Requests">
                        {content}
                    </div>
                    <div className="supp2" title="My Requests">
                        {content}
                    </div>
                </div>
            )}
            {showUser && (
                <button id="newUser" onClick={() => console.log('Created new User')}>
                    Create New User
                </button>
            )}
            {showDevice && (
                <button id="newDevice" onClick={() => console.log('Created new Device')}>
                    Add Device
                </button>
            )}
            {showSupport && (
                <button id="newDevice" onClick={() => console.log('New Request made')}>
                    Create New Request
                </button>
            )}
        </div>
    );
}
