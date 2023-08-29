import '../../styling/NavBar.css';
import React from 'react';
import {TabView} from "./TabView";

const NavBar = () => {
    let tabItems = [];
    const TabNames = ['Role Creation', 'Users', 'Data Scopes', 'Access Requests', 'Compliance Matrix', 'Devices', 'Support Requests', 'Risks', 'Requests', 'Asset Requests'];

    if ( true ) {//Role Creation
        tabItems.push(0);
    }
    if ( true ) {//Users
        tabItems.push(1);
    }
    if ( true ) {//Data Scopes
        tabItems.push(2);
    }
    if ( true ) {//Access Requests
        tabItems.push(3);
    }
    if ( true ) {//Compliance Matrix
        tabItems.push(4);
    }
    if ( true ) {//Devices
        tabItems.push(5);
    }
    if ( true ) {//Support Requests
        tabItems.push(6);
    }
    if ( true ) {//Risks
        tabItems.push(7);
    }
    if ( true ) {//Requests
        tabItems.push(8);
    }
    if ( true ) {//Asset Requests
        tabItems.push(9);
    }

    let activeTab = tabItems[0];

    const handleClick = (NavTabIndex) => {
        activeTab = NavTabIndex;
    };

    const displayPage = () => {
        return(
            <div className="navbar">
                {displayTabs({viewTabs: tabItems})}
                <TabView currentTab={activeTab}></TabView>
            </div>
        );
    }

    const displayTabs = ({viewTabs}) => {
        return (
            <ul className="tabs">
                {viewTabs.map((i) => (
                    <li
                        key={i}
                        className={activeTab === i ? 'active' : ''}
                        onClick={() => handleClick(i)}
                    >
                        {TabNames[i]}
                    </li>
                ))}
            </ul>
        );
    };

    return displayPage();

};
export default NavBar;