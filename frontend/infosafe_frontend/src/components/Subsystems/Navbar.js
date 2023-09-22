import '../../styling/NavBar.css';
import React, {useEffect, useState} from 'react';
import {TabView} from "./TabView";
import {IoMenu, IoPeopleSharp, IoPersonCircleSharp} from "react-icons/io5";
import {ChangePassword} from "../Edit/ChangePassword";
import {FaHome, FaProjectDiagram, FaLock, FaTasks} from 'react-icons/fa';
import {RiUserSettingsFill} from 'react-icons/ri';
import {IoPeopleSharp} from 'react-icons/io5';
import {PiDevicesFill} from 'react-icons/pi';
import {BiSupport} from 'react-icons/bi';
import {CgDanger} from 'react-icons/cg';
import {TbDevicesPc} from 'react-icons/tb';
import {MdOutlineDashboardCustomize} from 'react-icons/md';
import {useGetPerms} from "../getData/getPerms";

const NavBar = () => {
    const [activeTab, setActive] = useState(0);
    let tabItems = [];
    const {roles} = useGetPerms();
    const TabNames = ['Home', 'Role Creation', 'Users', 'Data Scopes', 'Access Requests', 'Tasks', 'Devices', 'Support Requests', 'Risks',  'Asset Requests', 'Requests'];
    const TabIcons = [<FaHome className="icon" />, <RiUserSettingsFill className="icon" />, <IoPeopleSharp className="icon" />, <FaProjectDiagram className="icon" />,  <FaLock className="icon" />, <FaTasks  className="icon" />, <PiDevicesFill className="icon" />, <BiSupport className="icon" />, <CgDanger className="icon" />, <TbDevicesPc className="icon" />, <MdOutlineDashboardCustomize className="icon" /> ]
    tabItems.push(0);

    if (roles.includes("role_creation")) {//Role Creation
        tabItems.push(1);
    }
    if (roles.includes("user_create") || roles.includes("user_edit") || roles.includes("user_delete")) {//Users
        tabItems.push(2);
    }
    if (roles.includes("data_scope_edit") || roles.includes("data_scope_create") || roles.includes("data_scope_delete")) {//Data Scopes
        tabItems.push(3);
    }
    if (roles.includes("access_requests_approve") || roles.includes("access_requests_edit")) {//Access Requests
        tabItems.push(4);
    }
    if (roles.includes("tasks_create") || roles.includes("tasks_edit") || roles.includes("tasks_delete") || roles.includes("tasks_approve")) {//Compliance Matrix
        tabItems.push(5);
    }
    if (roles.includes("devices_create") || roles.includes("devices_edit") || roles.includes("devices_delete")) {//Devices
        tabItems.push(6);
    }
    if (roles.includes("support_requests_viewAll") || roles.includes("support_requests_edit") || roles.includes("support_requests_delete") || roles.includes("request_support")) {//Support Requests
        tabItems.push(7);
    }
    if (roles.includes("risks_create") || roles.includes("risks_edit") || roles.includes("risks_review")) {//Risks
        tabItems.push(8);
    }
    if (roles.includes("asset_request_review")) {//Asset Requests
        tabItems.push(9);
    }
    if (roles.includes("request_asset") || roles.includes("request_support") || roles.includes("request_access")) {//Requests
        tabItems.push(10);
    }


    const handleClick = (NavTabIndex) => {
        setActive(NavTabIndex);
    };

    const [menuVisible, setMenuVisible] = useState(false);

    if (sessionStorage.getItem('accessToken') == null) {
        window.location.href = "/";
    }
    const [settings, showSettings] = useState(false);
    const [changePassOpen, setChangePassOpen] = useState(false);
    const [username, setUserName] = useState('');
    const [width , setWidth] = useState(100);
    const [left,setLeft] = useState(0);

    useEffect(() => {
        fetch('http://localhost:8080/api/user/getUserName', {
            method: "GET",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            }
        })
            .then((res) => res.json())
            .then((result) => {
                setUserName(result.username);
            });
    }, []);
    const showDiv = () => {
        showSettings(!settings);
        if (!settings){
            document.getElementById("userDisplay").style.right = "24%";
            document.getElementById("avatar").style.right = "22%";
        }else{
            document.getElementById("userDisplay").style.right= "4%";
            document.getElementById("avatar").style.right = "2%";
        }
    };

    const displayMenu = () => {
        setMenuVisible(!menuVisible);
        if (!menuVisible) {
            document.getElementById("tabMenu").style.display = "block";
            // document.getElementById("backdrop").style.backgroundColor = "red";
            setWidth(88);
            setLeft(12);
        } else {
            document.getElementById("tabMenu").style.display = "none";
            setWidth(100);
            setLeft(0);
        }
    };


    const displayPage = () => {
        return (
            <div className="navbar">

                <div className="tabMenu" id="tabMenu">
                    {/*<img src="../../images/InfoSafe_Logo.png" alt="InfoSafeLogo" className="navbarLogo" />*/}
                    <p className="systemNameLabel">InfoSafe</p>
                    {displayTabs({viewTabs: tabItems})}
                </div>

                <div className='shift' style={{ width: `${width}%`,left: `${left}%`}}>
                    <div className="toolbar" id="toolbar" style={{width: `${width}%`}}>
                        <div className="toolbarLeft">
                            <IoMenu className="menuIcon" onClick={displayMenu}/>
                            <p className="tabTitle">{TabNames[activeTab]}</p>  {/*Get this from the respective tabs*/}
                        </div>
                        <div className="toolbarRight">
                            <p className="userDisplay" id="userDisplay">{username}</p>
                            <IoPersonCircleSharp className="avatar" id="avatar" onClick={showDiv}/>
                            {settings &&
                                <div className="settingsDiv">
                                    <p className="changeLabel" onClick={() => setChangePassOpen(true)}>Change Password</p>
                                    <p className="logoutLabel" onClick={() => {
                                        sessionStorage.removeItem('accessToken');
                                        window.location.href = "/";
                                    }}>Logout</p>
                                    {changePassOpen ? (
                                        <ChangePassword
                                            popupClose={() => setChangePassOpen(false)}
                                            popupOpen={changePassOpen}
                                        />
                                    ) : null}
                                </div>
                            }
                        </div>
                    </div>
                    <div className="displayTabContent">
                        <TabView currentTab={activeTab}></TabView>
                    </div>
                </div>
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
                        {TabIcons[i]}
                        {TabNames[i]}
                    </li>
                ))}
            </ul>
        );
    };

    return displayPage();

};
export default NavBar;