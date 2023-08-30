import '../../styling/NavBar.css';
import React, {useState} from 'react';
import {TabView} from "./TabView";
import AccessAndDisplay from "../Roles/AccessAndDisplay";

const NavBar = () => {
    const [activeTab,setActive] = useState(0);
    let tabItems = [];
    const {roles} = AccessAndDisplay();
    const TabNames = ['Role Creation', 'Users', 'Data Scopes', 'Access Requests', 'Compliance Matrix', 'Devices', 'Support Requests', 'Risks', 'Requests', 'Asset Requests'];

    if ( roles.includes("role_creation") ) {//Role Creation
        tabItems.push(0);
    }
    if ( roles.includes("user_create") || roles.includes("user_edit") || roles.includes("user_delete")) {//Users
        tabItems.push(1);
    }
    if ( roles.includes("data_scope_edit") || roles.includes("data_scope_create") || roles.includes("data_scope_delete") ) {//Data Scopes
        tabItems.push(2);
    }
    if ( roles.includes("access_requests_approve") || roles.includes("access_requests_edit")) {//Access Requests
        tabItems.push(3);
    }
    if ( roles.includes("tasks_create") || roles.includes("tasks_edit") || roles.includes("tasks_delete") || roles.includes("tasks_approve")) {//Compliance Matrix
        tabItems.push(4);
    }
    if ( roles.includes("devices_create") || roles.includes("devices_edit") || roles.includes("devices_delete") ) {//Devices
        tabItems.push(5);
    }
    if ( roles.includes("support_requests_viewAll") || roles.includes("support_requests_edit") || roles.includes("support_requests_delete") || roles.includes("request_support")) {//Support Requests
        tabItems.push(6);
    }
    if ( roles.includes("risks_create") || roles.includes("risks_edit") || roles.includes("risks_review") ) {//Risks
        tabItems.push(7);
    }
    if ( roles.includes("request_asset") || roles.includes("request_support") || roles.includes("request_access") ) {//Requests
        tabItems.push(8);
    }
    if ( roles.includes("asset_request_review")) {//Asset Requests
        tabItems.push(9);
    }


    const handleClick = (NavTabIndex) => {
        setActive(NavTabIndex);
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