import Popup from 'reactjs-popup';
import React, {useEffect, useState} from 'react';
import '../../styling/EditDevice.css';
import { IoArrowBackOutline } from 'react-icons/io5';
import Dropdown from 'react-dropdown';
import Select from "react-select";

const STATUS_OPTIONS = ['Clean', 'Full', 'Broken'];
// const NEW_OPTIONS = ['YES', 'NO'];
const AVAILABILITY_OPTIONS = ['Yes', 'No'];
const EditDevice = ({ asset, popupClose, popupOpen }) => {
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState({});
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
    }, [asset]);

    const handleSelect = (selectedOptions) => {
        setSelectedUsers(selectedOptions);
        if (asset.current_assignee !== newPreviousAssignee)
        {
            setValues({
                asset_id: asset.asset_id,
                asset_name: asset.asset_name,
                asset_description: asset.asset_description,
                status: asset.status,
                used: asset.used,
                availability: asset.availability,
                device_type: asset.device_type,
                current_assignee: selectedUsers,
                previous_assignee: newPreviousAssignee
            });
        }
    };

    const handleSubmit = (e) => {
        console.log('Previous assignee: ');
        console.log(newPreviousAssignee);
        e.preventDefault();
        console.log(values)
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

    const customStyles = {
        control: (base, state) => ({
            ...base,
            background: "#CECECE",
            // match with the menu
            borderRadius: state.isFocused ? "2px 2px 0 0" : 3,
            // Removes weird border around container
            boxShadow: state.isFocused ? null : null,
            width: "70%",
            color: 'black',
            borderColor: state.isFocused ? "grey" : "transparent",
            '&:hover': { borderColor: 'grey' }
        }),
        menu: base => ({
            ...base,
            // override border radius to match the box
            borderRadius: 0,
            // kill the gap
            marginTop: 0,
            width: "70%",
        }),
        menuList: base => ({
            ...base,
            // kill the white space on first and last option
            padding: 0

        }),
        dropdownIndicator: base => ({
            ...base,
            color: '#999',
        }),
        placeholder: base => ({
            ...base,
            color: 'black'
        }),
        multiValue: base => ({
            ...base,
            background: "white",
            color: 'black'
        })
    };

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
                                <p className="editCurrentCustodianLabel">Current Custodian</p>
                                {users && users.length > 0 ? (
                                    <Select
                                        styles={customStyles}
                                        options={users.map((data) => ({ value: data.user_id, label: data.email }))}
                                        value={selectedUsers}
                                        className="userSelect"
                                        name="datascopeDropdown"
                                        placeholder={"Add Assignees"}
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
