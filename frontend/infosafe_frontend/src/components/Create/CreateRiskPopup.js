import Popup from 'reactjs-popup';
import React, {useState,  useEffect } from 'react';
import '../../styling/CreateRisk.css';
import { IoArrowBackOutline } from 'react-icons/io5';
import Dropdown from 'react-dropdown';
const PROBABILITY = ['Almost Certain', 'Likely', 'Moderate','Unlikely','Rare'];
// const DATA_SCOPES = ['DATA SCOPE 1', 'DATA SCOPE 2', 'DATA SCOPE 3', 'DATA SCOPE 4'];
const IMPACT = ['Insignificant','Minor','Significant','Major','Severe'];

export const CreateRisk = ({ popupClose, popupOpen }) => {
    const [datascopeData, setDatascopeData] = useState(null);
    const handleClick=(e)=> {
        e.preventDefault()
        // const risk = {ds_id, impact_rating, risk_description, risk_status, suggested_mitigation}
        // console.log(risks)
        fetch("http://localhost:8080/api/risk/addRisk", {
            method:"POST",
            headers:{"Content-Type":"application/json",
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            },
            // body:JSON.stringify(risk)
        }).then(()=>{
            console.log("New risk added")
        })
        popupClose()
    };

    useEffect(() => {
        fetch('http://localhost:8080/api/datascope/getDs', {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            }
        })
            .then((res) => res.json())
            .then((result) => {
                setDatascopeData(result);
            });
    }, []);


    return (
        <Popup open={popupOpen} closeOnDocumentClick={false}>
            <div className="createRiskOverlay">
                <div className="borderCreateRisk">
                    <button className="backButton" onClick={popupClose}>
                        <IoArrowBackOutline className="backIcon" />
                    </button>
                    <form>
                        <p className="pageTitle">Create Risk</p>
                        <p className="inputTitle">Data Scope</p>
                        <Dropdown
                            // options={datascopeData.ds_name}
                            // value={datascopeData[0]}
                            className="datascopeDropdown"
                            name="datascopeDropdown"
                        />
                        <p className="inputTitle">Probability</p>
                        <Dropdown
                            options={PROBABILITY}
                            value={PROBABILITY[0]}
                            className="probabilityDropdown"
                            name="probabilityDropdown"
                        />
                        <p className="inputTitle">Impact</p>
                        <Dropdown
                            options={IMPACT}
                            value={IMPACT[0]}
                            className="impactDropdown"
                            name="impactDropdown"
                        />
                        <p className="inputTitle">Vulnerability</p>
                        <textarea className="inputTextArea" />
                        <p className="inputTitle">Threat</p>
                        <textarea className="inputTextArea" />
                        <div>
                            <button className="submitButton" type="submit" onClick={popupClose}>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Popup>
    );
};
