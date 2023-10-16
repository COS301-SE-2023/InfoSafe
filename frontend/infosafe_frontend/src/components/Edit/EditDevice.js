import Popup from 'reactjs-popup';
import React, {useEffect, useState} from 'react';
import '../../styling/EditDevice.css';
import { IoArrowBackOutline } from 'react-icons/io5';
import Dropdown from 'react-dropdown';
import Select from "react-select";
import {customStyles} from "../CustomStyling";

const STATUS_OPTIONS = ['Clean', 'Full', 'Broken'];
const AVAILABILITY_OPTIONS = ['Yes', 'No'];


const EditDevice = ({ asset, popupClose, popupOpen, onAssesEdited }) => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userChanged, setUserChanged] = useState(false);
    let newPreviousAssignee = '';
    const [placeholder, setPlaceholder] = useState("New Assignee");
    const [request, setRequest] = useState({});
    let emailValue = "None";

    if(asset.current_assignee !== null){
        newPreviousAssignee = asset.current_assignee.email;
        emailValue = asset.current_assignee.email;
    }

    const[values, setValues]=useState({
        asset_id: '',
        asset_name: '',
        asset_description: '',
        status: '',
        used: '',
        availability: '',
        device_type: '',
        current_assignee: '',
        previous_assignee: ''
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
        setRequest({current_assignee: selectedOption.label,
            previous_assignee: newPreviousAssignee})
        setPlaceholder(selectedOption.label);
        setUserChanged(true);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(request)
        let mergedRequest = userChanged ? { ...values, ...request } : { ...values };
        //console.log(mergedRequest)
        if (( request.asset_name === '' || request.asset_description === '' || request.device_type === '' ) || (request.availability === 'No' && request.current_assignee === null)){
            document.getElementById("editDeviceError").style.display = "block";
            return;
        }

        //console.log(request);
        fetch('https://infosafe.live/api/asset/update/' + asset.asset_id, {
            method:"PUT",
            headers:{"Content-Type":"application/json",
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            },
            body:JSON.stringify(mergedRequest)
        }).then(()=>{
            console.log("Updated Asset")
            onAssesEdited()
        })
        popupClose()
    }

    useEffect(() => {
        fetch("https://infosafe.live/api/user/findUserNotAssigned/" + asset.asset_id, {
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
                        {values.availability  === 'No' && asset.current_assignee === null && (
                            <div>
                                <p className="editCurrentCustodianLabel">Current Assignee</p>
                                <p className="editDeviceCurrentUser">{emailValue}</p>
                                <p className="editChangeCustodianLabel">Change Assignee</p>
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
                                    <p className="editDevicesLoading">Loading...</p>
                                )}
                            </div>
                        )}
                        {values.availability  === 'No' && asset.current_assignee !== null && (
                            <div>
                                <p className="editCurrentCustodianLabel">Current Assignee</p>
                                <p className="editDeviceCurrentUser">{emailValue}</p>
                                <p className="editChangeCustodianLabel">Change Assignee</p>
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
                                    <p className="editDevicesLoading">Loading...</p>
                                )}
                            </div>
                        )}
                        <p className="editDeviceError" id="editDeviceError">Please ensure all fields are completed and that if an assets availability is set to "No", a user is assigned to it</p>
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
