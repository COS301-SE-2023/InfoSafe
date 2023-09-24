import Popup from 'reactjs-popup';
import React, {useEffect, useState} from 'react';
import '../../styling/EditDevice.css';
import { IoArrowBackOutline } from 'react-icons/io5';
import Dropdown from 'react-dropdown';
import Select from "react-select";

const STATUS_OPTIONS = ['Clean', 'Full', 'Broken'];
const AVAILABILITY_OPTIONS = ['Yes', 'No'];
const EditDevice = ({ asset, popupClose, popupOpen }) => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const newPreviousAssignee = asset.current_assignee;

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
                current_assignee: asset.current_assignee,
                previous_assignee: asset.previous_assignee
            });
        }
        //console.log(asset);
    }, [asset]);

    const handleSelect = (selectedOptions) => {
        setSelectedUser(selectedOptions);
        console.log(selectedOptions);
        asset.current_assignee = selectedOptions;
        if (asset.current_assignee !== newPreviousAssignee)
        {
            asset.previous_assignee = newPreviousAssignee;
            setValues({
                asset_id: asset.asset_id,
                asset_name: asset.asset_name,
                asset_description: asset.asset_description,
                status: asset.status,
                used: asset.used,
                availability: asset.availability,
                device_type: asset.device_type,
                current_assignee: asset.current_assignee,
                previous_assignee: asset.previous_assignee
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("UPDATED = " + values)
        fetch('http://localhost:8080/api/asset/update/' + asset.asset_id, {
            method:"PUT",
            headers:{"Content-Type":"application/json",
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            },
            body:JSON.stringify(values)
        }).then(()=>{
            console.log("Updated Asset")
        })
        console.log(JSON.stringify(values))
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
        <Popup open={popupOpen} closeOnDocumentClick={false}>
            <div className="editDeviceOverlay">
                <div className="popupBackground">
                <div className="borderEditDevice">
                    <button className="editDeviceBackButton" onClick={popupClose}>
                        <IoArrowBackOutline className="editDeviceBackIcon" />
                    </button>
                    <form onSubmit={handleSubmit}>
                        <p className="editDeviceTitle">Edit Device</p>
                        <div className="editDeviceDescriptionDiv">
                            <p className="editDeviceDescriptionLabel">Description</p>
                            <textarea
                                className="editDeviceDescriptionInput"
                                defaultValue={asset.asset_description}
                                onChange={e => setValues({...values, asset_description: e.target.value})}
                            />
                        </div>
                        <p className = "editDeviceAvailabilityLabel">Available</p>
                        <Dropdown
                            options={AVAILABILITY_OPTIONS}
                            value={asset.availability}
                            className="editDeviceAvailableDropdown"
                            name="status"
                            onChange={(selectedOption) => setValues({...values, availability: selectedOption.value})}
                        />
                        <div className="editDeviceStatusDiv">
                            <p className="editDevicestatusTitle">Status</p>
                            <Dropdown
                                options={STATUS_OPTIONS}
                                value={asset.status}
                                className="editDeviceStatusDropdown"
                                name="availability"
                                onChange={(selectedOption) => setValues({...values, status: selectedOption.value})}
                            />
                        </div>
                        {values.availability  === 'No' && (
                            <div>
                                <p className="currentCustodianLabel">Current Custodian</p>
                                {users && users.length > 0 ? (
                                    <Select
                                        placeholder={'Change Assignee'}
                                        options={users.map((data) => ({ value: data.user_id, label: data.email }))}
                                        value={selectedUser}
                                        className="datascopeDropdown"
                                        name="datascopeDropdown"
                                        onChange={handleSelect}
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
