import React from "react";
import "../../styling/ViewDevice.css";
import Popup from "reactjs-popup";
import { IoArrowBackOutline } from "react-icons/io5";

export const ViewDevice = ({ asset, popupOpen, popupClose }) => {
    return (
        <Popup open={popupOpen} closeOnDocumentClick={false} position='center center'>
            <div className='viewDeviceOverlay'>
                <div className='viewDeviceBorder'>
                    <button className='backButton' onClick={popupClose} data-testid='back-button'>
                        <IoArrowBackOutline className='backIcon' />
                    </button>
                    <p className='viewDeviceLabel'>View Device</p>
                    <p className='viewDeviceNameLabel'>Device Name</p>
                    <p className='viewDeviceName'>{asset.asset_name}</p>
                    <p className='viewDeviceTypeLabel'>Device Type</p>
                    <p className='viewDeviceType'>{asset.device_type}</p>
                    <p className='viewDeviceDescriptionLabel'>Device Description</p>
                    <textarea className='viewDeviceDescription' readOnly={true} defaultValue={asset.asset_description}/>
                    <p className = 'viewDeviceNewLabel'>New</p>
                    <p className = 'viewDeviceNew'>{asset.used}</p>
                    <p className = 'viewDeviceAvailabilityLabel'>Available</p>
                    <p className = 'viewDeviceAvailability'>{asset.availability}</p>
                    <p className='viewDeviceStatusLabel'>Status</p>
                    <p className='viewDeviceStatus'>{asset.status}</p>
                    <p className='viewDeviceCurrentCustodianLabel'>Current Custodian</p>
                    <p className='viewDeviceCurrentCustodian'>{asset.current_assignee}</p>
                    <p className='viewDevicePreviousCustodianLabel'>Previous Custodian</p>
                    <p className='viewDevicePreviousCustodian'>{asset.previous_assignee}</p>

                </div>
            </div>
        </Popup>
    );
};

export default ViewDevice;
