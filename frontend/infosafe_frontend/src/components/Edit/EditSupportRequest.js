import React, {useState} from 'react';
import '../../styling/EditSupportRequest.css';
import Popup from 'reactjs-popup';
import { IoArrowBackOutline } from 'react-icons/io5';
import Dropdown from "react-dropdown";
/* eslint-disable react/prop-types */
/* eslint-disable  no-unused-vars */
const STATUS = ["LOGGED","IN PROGRESS","RESOLVED"];
const EditSupportRequest = ({ support, popupOpen, popupClose }) => {
    const[values, setValues]=useState({
        support_id: support.support_id,
        user_id: support.user_id,
        support_type: support.support_type,
        support_description: support.support_description,
        support_status: support.support_status
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values)
        fetch('http://ec2-3-87-39-90.compute-1.amazonaws.com:80/api/supportrequest/update/' + support.support_id, {
            method:"PUT",
            headers:{"Content-Type":"application/json",
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            },
            body:JSON.stringify(values)
        }).then(()=>{
            console.log("Updated AccessRequest")
        })
        //console.log(JSON.stringify(values))
        popupClose()
    }

    return (
        <Popup open={popupOpen} closeOnDocumentClick={false} position="center center">
            <div className="editSupportRequestPopup">
                <div className="editSupportRequestPopupBorder">
                    <button className="editSupportRequestBackButton" onClick={popupClose}>
                        <IoArrowBackOutline className="editSupportRequestBackIcon" />
                    </button>
                    <form onSubmit={handleSubmit}>
                        <p className="editSupportRequestTitle">Edit Support Request</p>
                        <div className="editSupportRequestTypeDiv">
                            <p className="editSupportRequestTypeLabel">Type of Support Request</p>
                            <p className="editSupportRequestTypeDisplay">{support.support_type}</p>
                        </div>
                        <div className="editSupportRequestUserDiv">
                            <p className="editSupportRequestUserLabel">User</p>
                            <p className="editSupportRequestTypeDisplay">{support.user_id}</p>
                        </div>
                        <div className="editSupportRequestDescriptionDiv">
                            <p className="editSupportRequestDescriptionLabel">Description</p>
                            <textarea
                                className="editSupportRequestDescriptionDisplay"
                                readOnly={true}
                                defaultValue={support.support_description}
                            ></textarea>
                        </div>
                        <div className="editSupportRequestStatusDiv">
                            <p className="editSupportRequestStatusLabel">Status</p>
                            <Dropdown
                                options={STATUS}
                                value={support.support_status}
                                className="updateSupportRequestDropdown"
                                name="updateSupportRequestDropdown"
                                onChange={(selectedOption) => setValues({...values, support_status: selectedOption.value})}
                            />
                        </div>
                        <div className="editSupportRequestButtonsDiv">
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
        </Popup>
    );
};

export default EditSupportRequest;
