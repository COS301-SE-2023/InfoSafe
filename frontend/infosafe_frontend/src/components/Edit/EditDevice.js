import Popup from 'reactjs-popup';
import React, {useEffect, useState} from 'react';
import '../../styling/EditDevice.css';
import { IoArrowBackOutline } from 'react-icons/io5';
import Dropdown from 'react-dropdown';
import Select from "react-select";
import {customStyles} from "../CustomStyling";

const STATUS_OPTIONS = ['Clean', 'Full', 'Broken'];
const AVAILABILITY_OPTIONS = ['Yes', 'No'];

const EditDevice = ({ asset, popupClose, popupOpen }) => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const newPreviousAssignee = asset.current_assignee.email;
    let request = {};
    let userChanged = false;
    let placeholder = "Add Assignee";
    const[values, setValues]=useState({
        asset_id: '',
        asset_name: '',
        asset_description: '',
        status: '',
        used: '',
        availability: '',
        device_type: '',
    })
    useEffect(() => {
        if (asset) {
            setValues({
                asset_id: asset.asset_id,
                asset_name: asset.asset_name,
                asset_description: asset.asset_description,
                status: asset.status,
                used: asset.used,
                availability: asset.availability,
                device_type: asset.device_type,
            });
        }
    }, [asset]);

    const handleNewAssignee = (selectedOption) => {
        console.log(selectedOption)
        setSelectedUser(selectedOption);
        request = {
            current_assignee: selectedOption,
            previous_assignee: newPreviousAssignee
        }
        userChanged = true;
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(userChanged){
            request = {...values, ...request};
        }else {
            request = {...values};
        }
        console.log(request)
        fetch('http://localhost:8080/api/asset/update/' + asset.asset_id, {
            method:"PUT",
            headers:{"Content-Type":"application/json",
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            },
            body:JSON.stringify(request)
        }).then(()=>{
            console.log(request)
            console.log("Updated Asset")
        })
        popupClose()
    }

    useEffect(() => {
        fetch("http://localhost:8080/api/user/findUserNotAssigned/" + asset.asset_id + "/" + asset.current_assignee.email, {
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
        <Popup open={popupOpen} closeOnDocumentClick={false}>
            <div className="editDeviceOverlay">
                <div className="popupBackground">
                <div className="borderEditDevice">
                    <button className="editDeviceBackButton" onClick={popupClose} data-testid="back-button">
                        <IoArrowBackOutline className="editDeviceBackIcon" />
                    </button>
                    <form onSubmit={handleSubmit}>
                        <p className="editDeviceTitle">Edit Device</p>
                            <p className="editDeviceDescriptionLabel">Device Name</p>
                            <input className="deviceNameInput"
                                   defaultValue={asset.asset_name}
                                   onChange={e => setValues({...values, asset_name: e.target.value})}
                                   />
                            <p className="editDeviceDescriptionLabel">Description</p>
                            <textarea
                                className="editDeviceDescriptionInput"
                                defaultValue={asset.asset_description}
                                onChange={e => setValues({...values, asset_description: e.target.value})}
                            />
                        <p className = "editDeviceAvailabilityLabel">Available</p>
                        <Dropdown
                            options={AVAILABILITY_OPTIONS}
                            value={asset.availability}
                            className="editDeviceAvailableDropdown"
                            name="status"
                            onChange={(selectedOption) => setValues({...values, availability: selectedOption.value})}
                        />
                            <p className="editDeviceStatusLabel">Status</p>
                            <Dropdown
                                options={STATUS_OPTIONS}
                                value={asset.status}
                                className="editDeviceStatusDropdown"
                                name="availability"
                                onChange={(selectedOption) => setValues({...values, status: selectedOption.value})}
                            />
                        {values.availability  === 'No' && (
                            <div>
                                <p className="editCurrentCustodianLabel">Current Assignee</p>
                                <p>{asset.current_assignee.email}</p>
                                {users && users.length > 0 ? (
                                    <Select
                                        placeholder={placeholder}
                                        options={users.map((email) => ({ value: email, label: email }))}
                                        value={selectedUser || null}
                                        styles={customStyles}
                                        className="userSelect"
                                        name="datascopeDropdown"
                                        onChange={handleNewAssignee}
                                        isSearchable={true}
                                    />
                                ) : (
                                    <p>Loading...</p>
                                )}
                            </div>
                        )}
                        <button className="EditDeviceButton" type="submit">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
            </div>
        </Popup>
    );
};

export default EditDevice;
