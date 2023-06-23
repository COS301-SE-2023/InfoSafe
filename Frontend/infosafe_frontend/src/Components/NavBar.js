import '../Styling/NavBar.css';
import React, { useState } from 'react';

const NavBar = () => {
    const [activeNavTab, activate] = useState(0);

    const handleClick = (NavTabIndex) => {
        activate(NavTabIndex);
    };

    const displayInfo = () => {
        switch (activeNavTab) {
            case 0:
                const userItems = [];
                for (var i = 1; i < 30; i++) {
                    userItems.push(<li key={i}>User {i}</li>);
                }
        
                return (
                   
                    <div className='users'>
                        <ul className="userList">{userItems}</ul>
                    </div> 
                ); 
            case 1:
                const dataItems = [];
                for (var i = 1; i < 30; i++) {
                    dataItems.push(<li key={i}>Data Scope {i}</li>);
                }
        
                return (
                   
                    <div className='datascopes'>
                        <ul className="datascopesList">{dataItems}</ul>
                    </div> 
                ); 
            case 2:
                const accessRequests = [];
                for (var i = 1; i < 30; i++) {
                    accessRequests.push(<li key={i}>Access Request {i}</li>);
                }
                return (
                   
                    <div className='accessRequests'>
                        <ul className="accessrequestsList">{accessRequests}</ul>
                    </div> 
                ); 
            case 3:
                const complianceItems = [];
                for (var i=1; i < 30; i++) {
                    complianceItems.push(<li key={i}>Task {i}</li>);
                }
                return (
                    <div className="tasks">
                        <ul className="taskList">{complianceItems}</ul>
                    </div>

                );
            case 4:
                const devices = [];
                for (var i = 0; i < 26; i++) {
                    devices.push(<li key={i}>Device {String.fromCharCode(i + 65)}</li>);
                }
                return (
                    <div className='devices'>
                        <ul className='deviceList'>{devices}</ul>
                    </div>
                );
            default:
                return null;
            
    }
};
    
    const displayButtons = () => {
        switch (activeNavTab) {
            case 0:
                return (
                   
                    <button className='CreateUserButton' onClick={() => console.log('Created new User')}>
                        Create New User
                    </button>
                );   
            case 3:
                return (
                <div className="buttons">
                    <button className='CreateTaskButton' onClick={() => console.log('Created new task')}>
                        Create New User
                    </button>
                    <button className='UpdateTaskButton' onClick={() => console.log('Updated task.')}>
                        Update Task
                    </button>
                    <button className='RevokeTaskButton' onClick={() => console.log('Revoked task.')}>
                        Revoke Task
                    </button>
                </div>      
            );
            case 4:
                return (
                    <button className='AddDeviceButton' onClick={() => console.log('Added new device')}>
                        Add Device
                    </button>
                );
            default:
                return null;
    }
};

    return (
        <div className='navbar'>
            <ul className = "tabs">
                <li className={activeNavTab === 0 ? 'active' : ''} onClick={() => handleClick(0) }>Users</li>
                <li className={activeNavTab === 1 ? 'active' : ''} onClick={() => handleClick(1) }>Data Scopes</li>
                <li className={activeNavTab === 2 ? 'active' : ''} onClick={() => handleClick(2) }>Access Requests</li>
                <li className={activeNavTab === 3 ? 'active' : ''} onClick={() => handleClick(3) }>Compliance Matrix</li>
                <li className={activeNavTab === 4 ? 'active' : ''} onClick={() => handleClick(4) }>Devices</li>
                <li className={activeNavTab === 5 ? 'active' : ''} onClick={() => handleClick(5) }>Support Requests</li>
                <li className={activeNavTab === 6 ? 'active' : ''} onClick={() => handleClick(6) }>Risks</li>
            </ul>

            <div className="display">
                {displayInfo()}
                {displayButtons()}
            </div>
    </div>
    );
};

export default NavBar;
