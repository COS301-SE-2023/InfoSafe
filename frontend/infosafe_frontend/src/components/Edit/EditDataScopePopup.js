import React, {useState} from 'react';
import '../../styling/EditDataScopePopup.css';
import Popup from 'reactjs-popup';
import { IoArrowBackOutline } from 'react-icons/io5';
/* eslint-disable react/prop-types */
/* eslint-disable  no-unused-vars */
import Dropdown from 'react-dropdown';
import data from "bootstrap/js/src/dom/data";
const STATUS = ['CREATED', 'APPROVED', 'REJECTED', 'REVOKED'];


export const EditDataScopePopup = ({ datascope, popupOpen, popupClose }) => {
    const[values, setValues]=useState({
        data_scope_id: datascope.data_scope_id,
        data_custodian: datascope.data_custodian,
        date_captured: datascope.date_captured,
        ds_description: datascope.ds_description,
        ds_name: datascope.ds_name,
        ds_status: datascope.ds_status
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values)
        fetch('http://localhost:8080/api/datascope/update/' + datascope.data_scope_id, {
            method:"PUT",
            headers:{"Content-Type":"application/json",
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            },
            body:JSON.stringify(values)
        }).then(()=>{
            console.log("Updated Datascope")
        })
        //console.log(JSON.stringify(values))
        popupClose()
    }

    return (
        <Popup open={popupOpen} closeOnDocumentClick={false} position="center center">
            <div className="editDataScopeOverlay">
                <div className="editdatascopeBorder">
                    <form onSubmit={handleSubmit}>
                        <button className="backButton" onClick={popupClose}>
                            <IoArrowBackOutline className="backIcon" />
                        </button>
                        <p className="editDatascopeLabel">Edit Data Scope</p>
                        <p className="editDatasscopeNameLabel">Name</p>
                        <input
                            className="editDatascopeNameInput"
                            defaultValue={datascope.ds_name} onChange={e => setValues({...values, ds_name: e.target.value})}
                        />
                        <p className="editDescriptionLabel">Description</p>
                        <textarea
                            className="editDescriptionInput"
                            defaultValue={datascope.description} onChange={e => setValues({...values, ds_description: e.target.value})}
                        />
                        <br />
                        <p className="editStatusLabel">Status</p>
                        <Dropdown
                            options={STATUS}
                            //value={STATUS[0]}
                            className="editDSStatusDropdown"
                            data-testid="editDSStatusDropdown"
                            defaultValue={datascope.status}
                            onChange={selectedOption => setValues({...values, ds_status: selectedOption.value})}
                        />
                        <button className="editdatascope_finish">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </Popup>
    );
};
