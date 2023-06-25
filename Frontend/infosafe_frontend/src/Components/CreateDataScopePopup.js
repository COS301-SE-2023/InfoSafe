import React, {useState, component} from 'react';
import Dropdown from 'react-dropdown';
import '../Styling/CreateDataScopePopup.css';
import Popup from 'reactjs-popup';
import { render } from 'react-dom';

export const CreateDataScopePopup = ({ popupOpen, popupClose }) => {
    const current = new Date();
    const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;

    const[ds_name,setDsName]=useState('')
    const[ds_description,setDsDesc]=useState('')
    const[role_name,setRoleName]=useState('General User')
    const[role_description,setRoleDesc]=useState('Can use basic functionality of the product')
    const[date_captured,setDateCaptured]=useState(date)
    const[data_custodian,setDataCustodian]=useState('LoggedIn User')
    const[administrator,setAdmin]=useState('Admin1')
    const[status,setStatus]=useState('Pending Approval')

    const handleClick=(e)=> {
        e.preventDefault()
        const datascope = {ds_name, ds_description, role_name, role_description, date_captured, data_custodian, administrator, status}
        console.log(datascope)
        fetch("http://localhost:8080/datascope/add", {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(datascope)
        }).then(()=>{
            console.log("New Data-Scope added")
        })
        popupClose()
    }

    return (
        <Popup open={popupOpen} onClose={popupClose} position="center center">
            <div className="createDataScopeOverlay">
                <div className="createdatascopeBorder">
                    <form>
                        <p className="datascopeLabel">Data Scope Creation</p>
                        <p className="datascopeNameLabel">Name</p>
                        <input className="datascopeNameInput" value={ds_name} onChange={(e)=>setDsName(e.target.value)}/>
                        <p className="descriptionLabel">Description</p>
                        <textarea className="descriptionInput" value={ds_description} onChange={(e)=>setDsDesc(e.target.value)}/>
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
