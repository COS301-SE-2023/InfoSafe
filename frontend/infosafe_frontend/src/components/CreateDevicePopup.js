import React, {useState} from 'react';
import '../styling/CreateDevicePopup.css';
import Popup from 'reactjs-popup';

import { IoArrowBackOutline } from 'react-icons/io5';
import Dropdown from "react-dropdown";

const STATUS_OPTIONS = ['CLEAN', 'FULL', 'BROKEN'];
export const CreateDevicePopup = ({ popupOpen, popupClose }) => {
    // const current = new Date();
    // const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;
    const[serial_number,setSerial_number]=useState('')
    const[type_id,setType_id]=useState('')
    const[asset_description,setAsset_description]=useState('')
    const[availability]=useState('1')
    const[clean_status,setClean_status]=useState('CLEAN')
    const[new_device]=useState('1')

    const handleClick=(e)=> {
        e.preventDefault()
        const asset = {serial_number, type_id, asset_description, availability, clean_status, new_device}
        console.log(asset)
        fetch("http://localhost:8080/api/asset/addAsset", {
            method:"POST",
            headers:{"Content-Type":"application/json",
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            },
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
                        <input className="deviceTypeInput" value={type_id} onChange={(e)=>setType_id(e.target.value)}/>
                        <p className="deviceDescriptionLabel">Device Description</p>
                        <textarea className="deviceDescriptionInput" value={asset_description} onChange={(e)=>setAsset_description(e.target.value)}/>
                        <p className="assignedUserLabel">Assigned User</p>
                        <input className="assignedUserInput" value={serial_number} onChange={(e)=>setSerial_number(e.target.value)}/>
                        <p className="deviceStatusLabel">Status</p>
                        <Dropdown
                          options={STATUS_OPTIONS}
                          value={STATUS_OPTIONS[0]}
                          className="statusDropdown"
                          name="status"
                          onChange={(selectedOption) => setClean_status(selectedOption.value)}
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
