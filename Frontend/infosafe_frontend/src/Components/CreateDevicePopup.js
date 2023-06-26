import React, {useState} from 'react';
import '../Styling/CreateDevicePopup.css';
import Popup from 'reactjs-popup';
import Dropdown from 'react-dropdown';
import { IoArrowBackOutline } from 'react-icons/io5';

export const CreateDevicePopup = ({ popupOpen, popupClose }) => {
    const current = new Date();
    const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;

    const status_options = ['CLEAN', 'FULL', 'BROKEN'];
    const[asset_name,setAssetName]=useState('')
    const[asset_description,setAssetDesc]=useState('')
    const[date_acquired,setDate]=useState(date)
    const[status,setStatus]=useState('CLEAN')

    const handleClick=(e)=> {
        e.preventDefault()
        const asset = {asset_name, asset_description, date_acquired, status}
        console.log(asset)
        fetch("http://localhost:8080/api/asset/add", {
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
                        <p className="deviceStatusLabel">Status</p>
                        <Dropdown
                            options={status_options}
                            value={status_options[0]}
                            className="statusDropdown"
                            name="status"
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
