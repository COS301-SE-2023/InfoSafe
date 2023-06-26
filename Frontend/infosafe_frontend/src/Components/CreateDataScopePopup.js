import React, {useState} from 'react';
import '../Styling/CreateDataScopePopup.css';
import Popup from 'reactjs-popup';
import { IoArrowBackOutline } from 'react-icons/io5';

export const CreateDataScopePopup = ({ popupOpen, popupClose }) => {
    const current = new Date();
    const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;

    const[ds_name,setDsName]=useState('')
    const[ds_description,setDsDesc]=useState('')
    const[role_name,setRoleName]=useState('General User')
    const[role_description,setRoleDesc]=useState('Can use basic functionality of the product')
    const[date_captured,setDateCaptured]=useState(date)
    const[data_custodian,setDataCustodian]=useState('Alistair Ross')
    const[administrator,setAdmin]=useState('Admin1')
    const[status,setStatus]=useState('Pending Approval')

    const handleClick=(e)=> {
        e.preventDefault()
        const datascope = {ds_name, ds_description, role_name, role_description, date_captured, data_custodian, administrator, status}
        console.log(datascope)
        fetch("http://localhost:8080/api/auth/addDs", {
            method:"POST",
            headers:{"Content-Type":"application/json",
                Authorization: sessionStorage.getItem('accessToken')
            },
            body:JSON.stringify(datascope)
        }).then(()=>{
            console.log("New Data-Scope added")
        })
        popupClose()
    }

    return (
        <Popup open={popupOpen} closeOnDocumentClick={false} position="center center">
            <div className="createDataScopeOverlay">
                <div className="createdatascopeBorder">
                    <button className="backButton" onClick={popupClose}>
                        <IoArrowBackOutline className="backIcon" />
                    </button>
                    <form>
                        <p className="datascopeLabel">Data Scope Creation</p>
                        <p className="datascopeNameLabel">Name</p>
                        <input className="datascopeNameInput" />
                        <p className="descriptionLabel">Description</p>
                        <textarea className="descriptionInput" />
                        <br />
                        <button className="datascope_finish" onClick={handleClick}>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </Popup>
    );
};
