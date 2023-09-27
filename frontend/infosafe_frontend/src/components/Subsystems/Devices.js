import {CreateDevicePopup} from "../Create/CreateDevicePopup";
import React, {useEffect, useState} from "react";
import {ViewDevice} from "../View/ViewDevice";
import {FaSearch} from "react-icons/fa";
import {RiEditBoxFill} from "react-icons/ri";
import EditDevice from "../Edit/EditDevice";
import "../../styling/Devices.css";
import {useGetPerms} from "../getData/getPerms";
import {useGetAsset} from "../getData/getAsset";
import {HelpPopup} from "../HelpPopup";
import {IoHelpCircle} from 'react-icons/io5';
export const Devices = () => {
    const [createDeviceOpen, setCreateDeviceOpen] = useState(false);
    const {showAsset, loading, fetchAllAssets} = useGetAsset();
    const {roles} = useGetPerms();

    useEffect(() => {
        fetchAllAssets();
    }, []);

    const EditDeviceDiv = ({ asset }) => {
        const [editDeviceOpen, setEditDeviceOpen] = useState(false);
        if(roles.includes("devices_edit")) {
            return (
                <div className="deviceEditButton">
                    <RiEditBoxFill onClick={() => setEditDeviceOpen(!editDeviceOpen)} className="deviceEditIcon"/>
                    {editDeviceOpen ? (
                        <EditDevice
                            popupClose={() => setEditDeviceOpen(false)}
                            popupOpen={editDeviceOpen}
                            asset={asset}
                            onAssesEdited={fetchAllAssets}
                        />
                    ) : null}
                </div>
            )
        } else {
            return (null)
        }
    }

    const ViewDeviceItem = ({ asset }) => {
        const [viewDeviceOpen, setViewDeviceOpen] = useState(false);
        if(roles.includes("devices_create") || roles.includes("devices_edit") || roles.includes("devices_delete")) {
            return (
                <li key={asset.asset_id}>
                    <p onClick={() => setViewDeviceOpen(!viewDeviceOpen)}>
                        Asset {asset.asset_id}: {asset.asset_name}
                        {viewDeviceOpen ? (
                            <ViewDevice
                                popupClose={() => setViewDeviceOpen(false)}
                                popupOpen={viewDeviceOpen}
                                asset={asset}
                            />
                        ) : null}
                    </p>
                    <EditDeviceDiv asset={asset}></EditDeviceDiv>
                </li>
            );
        } else {
            return (null)
        }
    };

    const CreateDevice = () => {
        if(roles.includes("devices_create")) {
            return (
                <div className="AddDeviceDiv">
                    <button
                        className="AddDeviceButton"
                        onClick={() => setCreateDeviceOpen(!createDeviceOpen)}
                    >
                        Add Device
                    </button>
                    {createDeviceOpen ? (
                        <CreateDevicePopup
                            popupClose={() => setCreateDeviceOpen(false)}
                            popupOpen={createDeviceOpen}
                            onAssetCreated={fetchAllAssets}
                        />
                    ) : null}
                </div>
            )
        } else {
            return (null)
        }
    }

    const devices = [];
    showAsset.map((asset) =>
        devices.push(<ViewDeviceItem asset={asset} key={asset.asset_id} />)
    );
    if (devices.length === 0)
    {
        devices[0] = "No Devices added yet.";
    }

    const [helpOpen, setHelpOpen] = useState(false);
    const helpMsg = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";


    return(
        <div className="display">
            <div className="devicesBackground">
                <button  className="devicesHelpButton" onClick={() => setHelpOpen(true)}>
                    <IoHelpCircle className="helpPopupIcon"></IoHelpCircle>
                    {helpOpen ? (
                        <HelpPopup
                            popupClose={() => setHelpOpen(false)}
                            popupOpen={helpOpen}
                            message={helpMsg}
                        />
                    ) : null}
                </button>
                <div className="searchDevices">
                    <input
                        // data-testid="deviceSearch"
                        className="deviceSearchInput"
                        type="text"
                        id="deviceSearchInput"
                        name="deviceSearch"
                        // onChange={}
                    />
                    <FaSearch className="deviceSearchIcon" />
                </div>
                <div className="devices">
                    {loading ? (
                        <div className="loadingScreen">
                            <div className="loadingDiv">
                                <div className="loading"></div>
                            </div>
                        </div>
                    ) : (
                    <ul className="deviceList">{devices}</ul>
                    )}
                </div>
                <CreateDevice></CreateDevice>
            </div>

        </div>
    )
}