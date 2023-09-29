import React, {useState} from 'react';
import '../../styling/EditSupportRequest.css';
import Popup from 'reactjs-popup';
import { IoArrowBackOutline } from 'react-icons/io5';
import Dropdown from "react-dropdown";

const STATUS = ["Logged","In Progress","Resolved"];
const EditSupportRequest = ({ support, popupOpen, popupClose, editAllSupport, editMySupport }) => {
    const[values, setValues]=useState({
        support_id: support.support_id,
        support_type: support.support_type,
        support_description: support.support_description,
        support_status: support.support_status,
        user_id: support.user_id.email,
        dataScope_id: support.dataScope_id ? support.dataScope_id.data_scope_id : null,
        task_id: support.task_id ? support.task_id.task_id : null,
        asset_id: support.asset_id ? support.asset_id.asset_id : null
    })

    const handleSubmit = (e) => {
        e.preventDefault();

        //console.log(values)
        fetch('http://ec2-52-91-180-105.compute-1.amazonaws.com:8080/api/supportrequest/update/' + support.support_id, {
            method:"PUT",
            headers:{"Content-Type":"application/json",
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            },
            body:JSON.stringify(values)
        }).then(()=>{
            console.log("Updated AccessRequest")
            editAllSupport()
            editMySupport()
        })
        popupClose()
    }

    return (
        <Popup open={popupOpen} closeOnDocumentClick={false} position="center center">
            <div className="editSupportRequestPopup">
                <div className="popupBackground">
                    <div className="editSupportRequestPopupBorder">
                        <button className="editSupportRequestBackButton" onClick={popupClose} data-testid="back-button">
                            <IoArrowBackOutline className="editSupportRequestBackIcon" />
                        </button>
                        <form onSubmit={handleSubmit}>
                            <p className="editSupportRequestTitle">Edit Support Request</p>
                            <div className="editSupportRequestContent">
                                <p className="editSupportRequestTypeLabel">Type of Support Request</p>
                                <p className="editSupportRequestTypeDisplay">{support.support_type}</p>
                                <p className="editSupportRequestUserLabel">User</p>
                                <p className="editSupportRequestTypeDisplay">{support.user_id.first_name} {support.user_id.last_name}</p>
                                <p className="editSupportRequestDescriptionLabel">Description</p>
                                <textarea
                                    className="editSupportRequestDescriptionDisplay"
                                    readOnly={true}
                                    defaultValue={support.support_description}
                                ></textarea>
                                <p className="editSupportRequestStatusLabel">Status</p>
                                <Dropdown
                                    options={STATUS}
                                    value={support.support_status}
                                    className="updateSupportRequestDropdown"
                                    name="updateSupportRequestDropdown"
                                    onChange={(selectedOption) => setValues({...values, support_status: selectedOption.value})}
                                />
                                <button
                                    className="updateSupportRequestStatusButton"
                                    type="submit"
                                >
                                    Update Status
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Popup>
    );
};

export default EditSupportRequest;
