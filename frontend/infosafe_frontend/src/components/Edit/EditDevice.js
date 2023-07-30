import Popup from 'reactjs-popup';
import React, {useState} from 'react';
import '../../styling/EditDevice.css';
import { IoArrowBackOutline } from 'react-icons/io5';
import Dropdown from 'react-dropdown';

const STATUS_OPTIONS = ['CLEAN', 'FULL', 'BROKEN'];
// const NEW_OPTIONS = ['YES', 'NO'];
const AVAILABILITY_OPTIONS = ['YES', 'NO'];
const EditDevice = ({ asset, popupClose, popupOpen }) => {
    // const makeOptions = () => {
    //     var options = [];
    //     STATUS_OPTIONS.map((opt) => options.push(<option>{opt}</option>));
    //     return options;
    // };

    const[values, setValues]=useState({
        asset_id: asset.asset_id,
        asset_name: asset.asset_name,
        asset_description: asset.asset_description,
        //asset_availabiliyu: user.last_name,
        status: asset.status,
        current_custodian: asset.current_custodian,
        previous_custodian: asset.previous_custodian
    })

    const handleSubmit = (e) => {
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
        //console.log(JSON.stringify(values))
        popupClose()
    }

    return (
        <Popup open={popupOpen} closeOnDocumentClick={false}>
            <div className="editDeviceOverlay">
                <div className="borderEditDevice">
                    <button className="backButton" onClick={popupClose}>
                        <IoArrowBackOutline className="backIcon" />
                    </button>
                    <form onSubmit={handleSubmit}>
                        <p className="editDeviceTitle">Edit Device</p>

                        <div className="editDeviceDescriptionDiv">
                            <p className="editDeviceDescriptionLabel">Description</p>
                            <textarea
                                className="editDeviceDescriptionInput"
                                defaultValue={asset.asset_description} onChange={e => setValues({...values, asset_description: e.target.value})}
                            />
                        </div>
                        <p className = "editDeviceAvailabilityLabel">Available</p>
                        <Dropdown
                            options={AVAILABILITY_OPTIONS}
                            value={AVAILABILITY_OPTIONS[0]}
                            className="editDeviceAvailableDropdown"
                            // name="status"
                            // onChange={(selectedOption) => setStatus(selectedOption.value)}
                        />
                        <div className="editDeviceStatusDiv">
                            <p className="editDevicestatusTitle">Status</p>
                            <Dropdown
                                options={STATUS_OPTIONS}
                                value={asset.status} //onChange={e => setValues({...values, status: e.target.value})}
                                className="editDeviceStatusDropdown"
                                name="editDeviceStatusDropdown"
                            />
                        </div>
                        <p className="editDeviceCurrentCustodianLabel">Current Custodian</p>
                        <input
                            className="editDeviceCurrentCustodianInput"
                            defaultValue={asset.current_custodian} onChange={e => setValues({...values, current_custodian: e.target.value})}
                            // onChange={(e) => setAssignee(e.target.value)}
                        />
                        <p className="editDevicePreviousCustodianLabel">Previous Custodian</p>
                        <input
                            className="editDevicePreviousCustodianInput"
                            value={asset.previous_custodian} onChange={e => setValues({...values, previous_custodian: e.target.value})}
                            // onChange={(e) => setAssignee(e.target.value)}
                        />
                        <button className="EditDeviceButton" type="submit">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </Popup>
    );
};

export default EditDevice;
