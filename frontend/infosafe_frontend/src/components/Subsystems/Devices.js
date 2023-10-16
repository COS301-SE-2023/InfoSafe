import {CreateDevicePopup} from "../Create/CreateDevicePopup";
import React, {useEffect, useState} from "react";
import {ViewDevice} from "../View/ViewDevice";
import {FaSearch} from "react-icons/fa";
import {RiDeleteBin6Fill, RiEditBoxFill} from "react-icons/ri";
import EditDevice from "../Edit/EditDevice";
import "../../styling/Devices.css";
import {useGetPerms} from "../getData/getPerms";
import {useGetAsset} from "../getData/getAsset";
import {HelpPopup} from "../HelpPopup";
import {IoHelpCircle} from 'react-icons/io5';
import asset_help from "../../images/asset_help.png";
import {ConfirmDelete} from "../ConfirmDelete";
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

    const DeleteFunction = async (asset_id) => {
        try {
            const response = await fetch("https://infosafe.live/api/asset/deleteAsset/"+asset_id, {
                method: "DELETE",
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem('accessToken')
                }
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            } else {
                console.log("asset deleted");
                fetchAllAssets();
            }
            //return response.json();

        } catch (error) {
            console.error("Error deleting asset:", error);
            throw error;
        }
    };

    const DeleteDevice = ({asset}) => {
        const [deleteDeviceOpen, setDeleteDeviceOpen] = useState(false);
        if (roles.includes("devices_delete")) {
            return (
                <div className="usersDeleteButton">
                    <RiDeleteBin6Fill className="usersDeleteIcon" onClick={() => setDeleteDeviceOpen(true)}/>
                    {deleteDeviceOpen ? (
                        <ConfirmDelete
                            popupClose={() => setDeleteDeviceOpen(false)}
                            popupOpen={deleteDeviceOpen}
                            yesDelete={() => DeleteFunction(asset.asset_id)}
                        />
                    ) : null}{' '}
                </div>
            )
        } else {
            return null;
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
                    <DeleteDevice asset={asset}></DeleteDevice>
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


    return(
        <div className="display">
            <div className="devicesBackground">
                <button  className="devicesHelpButton" onClick={() => setHelpOpen(true)}>
                    <IoHelpCircle className="helpPopupIcon"></IoHelpCircle>
                    {helpOpen ? (
                        <HelpPopup
                            popupClose={() => setHelpOpen(false)}
                            popupOpen={helpOpen}
                            image={asset_help}
                        />
                    ) : null}
                </button>
                <div className="searchDevices">
                    {/*<input
                        // data-testid="deviceSearch"
                        className="deviceSearchInput"
                        type="text"
                        id="deviceSearchInput"
                        name="deviceSearch"
                        // onChange={}
                    />
                    <FaSearch className="deviceSearchIcon" />*/}
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