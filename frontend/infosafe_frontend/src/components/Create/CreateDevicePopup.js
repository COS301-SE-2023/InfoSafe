import React, {useState} from 'react';
import '../../styling/CreateDevicePopup.css';
import Popup from 'reactjs-popup';

import { IoArrowBackOutline } from 'react-icons/io5';
import Dropdown from "react-dropdown";
/* eslint-disable react/prop-types */
/* eslint-disable  no-unused-vars */
const STATUS_OPTIONS = ['CLEAN', 'FULL', 'BROKEN'];
const NEW_OPTIONS = ['YES', 'NO'];
const AVAILABILITY_OPTIONS = ['YES', 'NO'];
export const CreateDevicePopup = ({ popupOpen, popupClose }) => {
    const current = new Date();
    //const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;
    const[asset_name,setAsset_name]=useState('')
    const[asset_description,setAsset_description]=useState('')
    const[availability,setAvailability]=useState('')
    const[used,setUsed]=useState('')
    const[current_assignee,setCurrent_assignee]=useState('')
    const[previous_assignee,setPrevious_assignee]=useState('')
    const[status,setStatus]=useState('CLEAN')
    const[device_type,setDevice_type]=useState('')

    const handleClick=(e)=> {
        e.preventDefault()
        const asset = {asset_name, asset_description, current_assignee, previous_assignee, status, used, availability, device_type}
        console.log(asset)
        // if (availability == 'YES') {
        //     availability = true;
        // } else {
        //     availability = false;
        // }
        // if (used == 'YES') {
        //     used = true;
        // } else {
        //     used = false;
        // }
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
                        <input className="deviceNameInput"
                               value={asset_name} onChange={(e)=>setAsset_name(e.target.value)}
                        />
                        <p className="deviceTypeLabel">Device Type</p>
                        <input
                            className="deviceTypeInput"
                            value={device_type} onChange={(e)=>setDevice_type(e.target.value)}
                        />
                        <p className="deviceDescriptionLabel">Device Description</p>
                        <textarea className="deviceDescriptionInput"
                                  value={asset_description} onChange={(e)=>setAsset_description(e.target.value)}/>
                        <p className = "deviceNewLabel">New</p>
                        <Dropdown
                            options={NEW_OPTIONS}
                            value={NEW_OPTIONS[0]}  //onChange={(e)=>setAsset_description(e.target.value)}/>
                            className="newDropdown"
                            name="used"
                            onChange={(selectedOption) => setUsed(selectedOption.value)}
                        />
                        <p className = "deviceAvailabilityLabel">Available</p>
                        <Dropdown
                            options={AVAILABILITY_OPTIONS}
                            value={AVAILABILITY_OPTIONS[0]}  //onChange={(e)=>setAsset_description(e.target.value)}/>
                            className="availableDropdown"
                            name="availability"
                            onChange={(selectedOption) => setAvailability(selectedOption.value)}
                        />
                        <p className="deviceStatusLabel">Status</p>
                        <Dropdown
                          options={STATUS_OPTIONS}
                          value={STATUS_OPTIONS[0]}
                          className="createDeviceStatusDropdown"
                          name="status"
                          onChange={(selectedOption) => setStatus(selectedOption.value)}
                        />
                        <br />
                        <p className="currentCustodianLabel">Current Custodian</p>
                        <input
                            className="currentCustodianInput"
                            value={current_assignee}
                            onChange={(e) => setCurrent_assignee(e.target.value)}
                        />
                        <p className="previousCustodianLabel">Previous Custodian</p>
                        <input
                            className="previousCustodianInput"
                            value={previous_assignee}
                            onChange={(e) => setPrevious_assignee(e.target.value)}
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
