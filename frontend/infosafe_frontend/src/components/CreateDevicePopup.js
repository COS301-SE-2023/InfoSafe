import React, {useState} from 'react';
import '../styling/CreateDevicePopup.css';
import Popup from 'reactjs-popup';

import { IoArrowBackOutline } from 'react-icons/io5';
import Dropdown from "react-dropdown";

const STATUS_OPTIONS = ['CLEAN', 'FULL', 'BROKEN'];
export const CreateDevicePopup = ({ popupOpen, popupClose }) => {
    // const current = new Date();
    // const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;
    const[serialNumber,setSerialNumber]=useState('')
    const[typeID,setTypeID]=useState('')
    const[assetDescription,setAssetDescription]=useState('')
    const[availability,setAvailability]=useState('1')
    const[cleanStatus,setCleanStatus]=useState('CLEAN')
    const[newDevice,setNewDevice]=useState('1')

    const handleClick=(e)=> {
        e.preventDefault()
        const asset = {serialNumber, typeID, assetDescription, availability, cleanStatus, newDevice}
        console.log(asset)
        fetch("http://localhost:8080/api/asset/addAsset", {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(asset)
        }).then(()=>{
            console.log("New Asset added")
        })
        popupClose()
    }
    return (
        <Popup open={popupOpen} closeOnDocumentClick={false} position="center center">
            <div className="createDeviceOverlay">
                <div className="createDeviceBorder">
                    <button className="backButton" onClick={popupClose}>
                        <IoArrowBackOutline className="backIcon" />
                    </button>
                    <form>
                        <p className="createDeviceLabel">Add Device</p>
                        <p className="deviceTypeLabel">Device Type</p>
                        <input className="deviceTypeInput" value={asset_name} onChange={(e)=>setAssetName(e.target.value)}/>
                        <p className="deviceDescriptionLabel">Device Description</p>
                        <textarea className="deviceDescriptionInput" value={asset_description} onChange={(e)=>setAssetDesc(e.target.value)}/>
                        <p className="assignedUserLabel">Assigned User</p>
                        <input className="assignedUserInput" value={assignee} onChange={(e)=>setAssignee(e.target.value)}/>
                        <p className="deviceStatusLabel">Status</p>
                        <Dropdown
                          options={STATUS_OPTIONS}
                          value={STATUS_OPTIONS[0]}
                          className="statusDropdown"
                          name="status"
                          onChange={(selectedOption) => setStatus(selectedOption.value)}
                        />
                        <br />
                        <button className="createDevice_finish" onClick={handleClick}>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </Popup>
    );
};
