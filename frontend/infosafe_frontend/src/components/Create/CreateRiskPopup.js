import Popup from 'reactjs-popup';
import React, {useState,  useEffect } from 'react';
import '../../styling/CreateRisk.css';
import { IoArrowBackOutline } from 'react-icons/io5';
import Dropdown from 'react-dropdown';
const PROBABILITY = ['Almost Certain', 'Likely', 'Moderate','Unlikely','Rare'];
// const DATA_SCOPES = ['DATA SCOPE 1', 'DATA SCOPE 2', 'DATA SCOPE 3', 'DATA SCOPE 4'];
const IMPACT = ['Insignificant','Minor','Significant','Major','Severe'];
const STATUS = ['Open', 'In Progress', 'Resolved', 'Closed'];

export const CreateRisk = ({ popupClose, popupOpen }) => {
    const [datascopeData, setDatascopeData] = useState();
    const[ds_id, setDsId] = useState('')
    const[impact_rating, setImpactRating] = useState('')
    const[risk_description, setRiskDescription] = useState('')
    const[risk_status, setRiskStatus] = useState('')
    const[suggested_mitigation, setSuggestedMitigation] = useState('')

    const handleDescriptionChange = (e) => {
        setRiskDescription(e.target.value);
    };

    const handleMitigation = (e) => {
        setSuggestedMitigation(e.target.value);
    }
    const handleClick = (e)=> {
        e.preventDefault();
        const risk = {ds_id, impact_rating, risk_description, risk_status, suggested_mitigation};
        console.log(risk);
        fetch("http://localhost:8080/api/risk/addRisk", {
            method:"POST",
            headers:{"Content-Type":"application/json",
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            },
            body:JSON.stringify(risk)
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
                            options={datascopeData}
                            value={ds_id}
                            className="datascopeDropdown"
                            name="datascopeDropdown"
                            onChange={(selectedOption)=>setDsId(selectedOption.value)}
                        />
                        <p className="inputTitle">Risk Status</p>
                        <Dropdown
                            options={PROBABILITY}
                            value={PROBABILITY[0]}
                            className="probabilityDropdown"
                            name="probabilityDropdown"
                            onChange={(selectedOption) => setImpactRating(selectedOption.value)}
                        />
                        <p className="inputTitle">Impact</p>
                        <Dropdown
                            options={IMPACT}
                            value={IMPACT[0]}
                            className="impactDropdown"
                            name="impactDropdown"
                            onChange={(selectedOption) => setImpactRating(selectedOption.value)}
                        />
                        <p className="inputTitle">Risk Description</p>
                        <textarea
                            className="inputTextArea"
                            onChange={handleDescriptionChange}
                            value={risk_description}
                        />
                        <p className="inputTitle">Risk Status</p>
                        <Dropdown
                            options={STATUS}
                            value={STATUS[0]}
                            className="statusDropdown"
                            name="statusDropdown"
                            onChange={(selectedOption) => setRiskStatus(selectedOption.value)}
                        />
                        <p className="inputTitle">Suggested Mitigation</p>
                        <textarea
                            className="inputTextArea"
                            onChange={handleMitigation}
                            value={suggested_mitigation}
                        />
                        <div>
                            <button className="submitButton" type="submit" onClick={handleClick}>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Popup>
    );
};
