import '../styling/NavBar.css';
import React, {useState } from 'react';
import ISO from './ISO';

/* eslint-disable react/prop-types */
/* eslint-disable  no-unused-vars */
const NavBar = ({ systemRole }) => {
    const [activeNavTab, activate] = useState(0);
    const handleClick = (NavTabIndex) => {
        activate(NavTabIndex);
    };



    /*    const ViewTaskItem = ( l ) => {
        const [viewTaskOpen, setViewTaskOpen] = useState(false);
        return (
            <li key={l}>
                <p onClick={() => setViewTaskOpen(!viewTaskOpen)}>
                    Task {l}
                    {viewTaskOpen && (
                        <ViewTask
                            popupClose={() => setViewTaskOpen(false)}
                            popupOpen={viewTaskOpen}
                        />
                    )}
                </p>
            </li>
        );
    };*/

    const displayPage = () => {
        if (systemRole === 'ISO') {
            return (
                <div className="navbar">
                    {displayISOTabs()}
                    {displayISOPage()}
                </div>
            );
        }
    };

    const displayISOTabs = () => {
        return (
            <ul className="tabs">
                <li className={activeNavTab === 0 ? 'active' : ''} onClick={() => handleClick(0)}>
                    Users
                </li>
                <li className={activeNavTab === 1 ? 'active' : ''} onClick={() => handleClick(1)}>
                    Data Scopes
                </li>
                <li className={activeNavTab === 2 ? 'active' : ''} onClick={() => handleClick(2)}>
                    Access Requests
                </li>
                <li className={activeNavTab === 3 ? 'active' : ''} onClick={() => handleClick(3)}>
                    Compliance Matrix
                </li>
                <li className={activeNavTab === 4 ? 'active' : ''} onClick={() => handleClick(4)}>
                    Devices
                </li>
                <li className={activeNavTab === 5 ? 'active' : ''} onClick={() => handleClick(5)}>
                    Support Requests
                </li>
                <li className={activeNavTab === 6 ? 'active' : ''} onClick={() => handleClick(6)}>
                    Risks
                </li>
                <li className={activeNavTab === 7 ? 'active' : ''} onClick={() => handleClick(7)}>
                    Requests
                </li>
            </ul>
        );
    };
    const displayISOPage = () => {
        return <ISO currentTab={activeNavTab} />;
    };

    return displayPage();
};
export default NavBar;
