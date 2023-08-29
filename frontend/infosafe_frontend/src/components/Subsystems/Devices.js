import {CreateDevicePopup} from "../Create/CreateDevicePopup";
import React, {useState} from "react";
import {ViewDevice} from "../View/ViewDevice";
import {FaRegEdit} from "react-icons/fa";
import EditDevice from "../Edit/EditDevice";
import AccessAndDisplay from "../Roles/AccessAndDisplay";

export const Devices = () => {
    const [createDeviceOpen, setCreateDeviceOpen] = useState(false);
    const {showAsset} = AccessAndDisplay()

    const EditDevice = ({asset}) => {
        const [editDeviceOpen, setEditDeviceOpen] = useState(false);
        return(
            <div className="AssetManagerEditIcon">
                <FaRegEdit  onClick={() => setEditDeviceOpen(!editDeviceOpen)} />
                {editDeviceOpen ? (
                    <EditDevice
                        popupClose={() => setEditDeviceOpen(false)}
                        popupOpen={editDeviceOpen}
                        asset={asset}
                    />
                ) : null}
            </div>
        )
    }

    const ViewDeviceItem = ({ asset }) => {

        const [viewDeviceOpen, setViewDeviceOpen] = useState(false);
        return (
            <li key={asset.id}>
                <p onClick={() => setViewDeviceOpen(!viewDeviceOpen)}>
                    Asset {asset.asset_id}: {asset.asset_name}:{' '}{asset.asset_description}
                    {viewDeviceOpen && (
                        <ViewDevice
                            popupClose={() => setViewDeviceOpen(false)}
                            popupOpen={viewDeviceOpen}
                            asset={asset}
                        />
                    )}
                </p>
                <EditDevice></EditDevice>
            </li>
        );
    };

    const CreateDevice = () => {
        return(
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
                    />
                ) : null}
            </div>
        )
    }

    const devices = [];
    showAsset.map((device) =>
        devices.push(<ViewDeviceItem asset={device} key={device.asset_id} />)
    );

    return(
        <div className="display">
            <div className="devices">
                <ul className="deviceList">{devices}</ul>
            </div>
            <CreateDevice></CreateDevice>
        </div>
    )
}