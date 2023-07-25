import React, {useState} from 'react';
import '../styling/CreateDevicePopup.css';
import Popup from 'reactjs-popup';

import { IoArrowBackOutline } from 'react-icons/io5';
import Dropdown from "react-dropdown";
/* eslint-disable react/prop-types */
/* eslint-disable  no-unused-vars */
const STATUS_OPTIONS = ['CLEAN', 'FULL', 'BROKEN'];
const NEW_OPTIONS = ['YES', 'NO'];
const AVAILABILITY_OPTIONS = ['YES', 'NO'];
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
                        <p className="deviceNameLabel">Device Name</p>
                        <input className="deviceNameInput" value={asset_name} onChange={(e)=>setAssetName(e.target.value)}/>
                        <p className="deviceTypeLabel">Device Type</p>
                        <input
                            className="deviceTypeInput"
                            // value=
                            // onChange={(e) => setAssetType(e.target.value)}
                        />
                        <p className="deviceDescriptionLabel">Device Description</p>
                        <textarea className="deviceDescriptionInput" value={asset_description} onChange={(e)=>setAssetDesc(e.target.value)}/>
                        <p className = "deviceNewLabel">New</p>
                        <Dropdown
                            options={NEW_OPTIONS}
                            value={NEW_OPTIONS[0]}
                            className="newDropdown"
                            // name="status"
                            // onChange={(selectedOption) => setStatus(selectedOption.value)}
                        />
                        <p className = "deviceAvailabilityLabel">Available</p>
                        <Dropdown
                            options={AVAILABILITY_OPTIONS}
                            value={AVAILABILITY_OPTIONS[0]}
                            className="availableDropdown"
                            // name="status"
                            // onChange={(selectedOption) => setStatus(selectedOption.value)}
                        />
                        <p className="deviceStatusLabel">Status</p>
                        <Dropdown
                          options={STATUS_OPTIONS}
                          value={STATUS_OPTIONS[0]}
                          className="createDeviceStatusDropdown"
                          name="status"
                          onChange={(selectedOption) => setClean_status(selectedOption.value)}
                        />
                        <br />
                        <p className="currentCustodianLabel">Current Custodian</p>
                        <input
                            className="currentCustodianInput"
                            // value={assignee}
                            // onChange={(e) => setAssignee(e.target.value)}
                        />
                        <p className="previousCustodianLabel">Previous Custodian</p>
                        <input
                            className="previousCustodianInput"
                            // value={assignee}
                            // onChange={(e) => setAssignee(e.target.value)}
                        />
                        <button className="createDeviceFinish" onClick={handleClick}>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </Popup>
    );
};
