import React, {useEffect, useState} from 'react';
import '../../styling/CreateDevicePopup.css';
import '../../styling/CreateTask.css';
import Popup from 'reactjs-popup';

import {IoArrowBackOutline} from 'react-icons/io5';
import Dropdown from "react-dropdown";
import Select from "react-select";

const STATUS_OPTIONS = ['Clean', 'Full', 'Broken'];
const NEW_OPTIONS = ['New', 'Used'];
const AVAILABILITY_OPTIONS = ['Yes', 'No'];
export const CreateDevicePopup = ({popupOpen, popupClose}) => {
    const current = new Date();
    const [asset_name, setAsset_name] = useState('')
    const [asset_description, setAsset_description] = useState('')
    const [availability, setAvailability] = useState('Yes')
    const [used, setUsed] = useState('New')
    const [current_assignee, setCurrent_assignee] = useState('')
    const [status, setStatus] = useState('Clean')
    const [device_type, setDevice_type] = useState('')
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState(null);


    const handleSelect = (selectedOptions) => {
        setSelectedUsers(selectedOptions);
    };

    const handleClick = (e) => {
        e.preventDefault()
        const asset = {
            asset_name,
            asset_description,
            status,
            availability,
            used,
            device_type,
            current_assignee: selectedUsers ? selectedUsers.label : '',
            previous_assignee: ''
        }
        console.log(current_assignee)
        fetch("http://localhost:8080/api/asset/addAsset", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            },
            body: JSON.stringify(asset)
        }).then(() => {
            console.log("New Asset added")
        })
        popupClose()
    }
    useEffect(() => {
        fetch("http://localhost:8080/api/user/getAll", {
            method: "GET",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            }
        })
            .then((res) => res.json())
            .then((result) => {
                setUsers(result);
            });
    }, []);


    return (
        <Popup open={popupOpen} closeOnDocumentClick={false} position="center center">
            <div className="createDeviceOverlay">
                <div className="popupBackground">
                    <div className="createDeviceBorder">
                        <button className="createDeviceBackButton" onClick={popupClose}>
                            <IoArrowBackOutline className="createDeviceBackIcon"/>
                        </button>
                        <form>
                            <p className="createDeviceLabel">Add Device</p>
                            <p className="deviceNameLabel">Device Name</p>
                            <input className="deviceNameInput"
                                   value={asset_name}
                                   onChange={(e) => setAsset_name(e.target.value)}
                            />
                            <p className="deviceTypeLabel">Device Type</p>
                            <input
                                className="deviceTypeInput"
                                value={device_type}
                                onChange={(e) => setDevice_type(e.target.value)}
                            />
                            <p className="deviceDescriptionLabel">Device Description</p>
                            <textarea className="deviceDescriptionInput"
                                      value={asset_description} onChange={(e) => setAsset_description(e.target.value)}/>
                            <p className="deviceNewLabel">Condition</p>
                            <Dropdown
                                options={NEW_OPTIONS}
                                value={NEW_OPTIONS[0]}  //onChange={(e)=>setAsset_description(e.target.value)}/>
                                className="newDropdown"
                                name="used"
                                onChange={(selectedOption) => setUsed(selectedOption.value)}
                            />
                            <p className="deviceStatusLabel">Status</p>
                            <Dropdown
                                options={STATUS_OPTIONS}
                                value={STATUS_OPTIONS[0]}
                                className="createDeviceStatusDropdown"
                                name="status"
                                onChange={(selectedOption) => setStatus(selectedOption.value)}
                            />
                            <br/>
                            <p className="deviceAvailabilityLabel">Availability</p>
                            <Dropdown
                                options={AVAILABILITY_OPTIONS}
                                value={AVAILABILITY_OPTIONS[0]}  //onChange={(e)=>setAsset_description(e.target.value)}/>
                                className="availableDropdown"
                                name="availability"
                                onChange={(selectedOption) => setAvailability(selectedOption.value)}
                            />

                            {availability === 'No' && (
                                <div>
                                    <p className="currentCustodianLabel">Current Custodian</p>
                                    {users && users.length > 0 ? (
                                        <Dropdown
                                            options={users.map((data) => ({value: data.user_id, label: data.email}))}
                                            value={selectedUsers}
                                            className="createDeviceCurrentCustodianDropdown"
                                            name="createDeviceCurrentCustodianDropdown"
                                            placeholder={"Select Current Custodian"}
                                            onChange={handleSelect}
                                            isSearchable={true}
                                        />
                                    ) : (
                                        <p>Loading...</p>
                                    )}
                                </div>
                            )}
                            <button className="createDeviceFinish" onClick={handleClick}>
                                Submit
                            </button>
                        </form>
                    </div>
                </div>

            </div>
        </Popup>
    );
};
