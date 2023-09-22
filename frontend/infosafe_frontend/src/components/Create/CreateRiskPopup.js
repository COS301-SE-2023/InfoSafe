import Popup from 'reactjs-popup';
import React, {useState,  useEffect } from 'react';
import '../../styling/CreateRisk.css';
import { IoArrowBackOutline } from 'react-icons/io5';
import Dropdown from 'react-dropdown';
import useRequestMaker from "./useRequestMaker";
import Select from "react-select";
const PROBABILITY = ['Almost Certain', 'Likely', 'Moderate','Unlikely','Rare'];
// const DATA_SCOPES = ['DATA SCOPE 1', 'DATA SCOPE 2', 'DATA SCOPE 3', 'DATA SCOPE 4'];
const IMPACT = ['Insignificant','Minor','Significant','Major','Severe'];
const STATUS = ['Open', 'In Progress', 'Resolved', 'Closed'];

export const CreateRisk = ({ popupClose, popupOpen }) => {
    const[risk_name, setRisk_name] = useState('')
    const[impact_rating, setImpactRating] = useState(IMPACT[0])
    const[probability_rating, setProbabilityRating] = useState(PROBABILITY[0])
    const[risk_description, setRiskDescription] = useState('')
    const[risk_status, setRiskStatus] = useState(STATUS[0])
    const[suggested_mitigation, setSuggestedMitigation] = useState('')
    const [datascope, setDataScope] = useState(null);
    const {datascopeData} = useRequestMaker();
    const handleDescriptionChange = (e) => {
        setRiskDescription(e.target.value);
    };
    const handleMitigation = (e) => {
        setSuggestedMitigation(e.target.value);
    }
    const handleNameChange = (e) => {
        setRisk_name(e.target.value);
    }
    const handleClick = (e)=> {
        e.preventDefault();
        const risk = {risk_name, impact_rating, probability_rating, risk_description, risk_status, suggested_mitigation, dataScope_id: datascope.value,};
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

    return (
        <Popup open={popupOpen} closeOnDocumentClick={false}>
            <div className="createRiskOverlay">
                <div className="borderCreateRisk">
                    <button className="backButton" onClick={popupClose}>
                        <IoArrowBackOutline className="backIcon" />
                    </button>
                    <form>
                        <p className="pageTitle">Create Risk</p>
                        <p className="inputTitle">Risk Name</p>
                        <textarea
                            className="inputTextArea"
                            onChange={handleNameChange}
                            value={risk_name}
                        />
                        <p className="inputTitle">Probability</p>
                        <Dropdown
                            options={PROBABILITY}
                            value={PROBABILITY[0]}
                            className="probabilityDropdown"
                            name="probabilityDropdown"
                            onChange={(selectedOption) => setProbabilityRating(selectedOption.value)}
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
                        <p className="inputTitle">Data Scope</p>
                        {datascopeData && datascopeData.length > 0 ? (
                            <Select
                                options={datascopeData.map((data) => ({value: data.data_scope_id, label: data.ds_name}))}
                                value={datascope}
                                className="accessRequestDatascopeDropdown"
                                name="datascopeDropdown"
                                placeholder={"Add DataScope"}
                                onChange={(selectedOption) => setDataScope(selectedOption)}
                            />
                        ) : (
                            <p className="loadTitle">Loading...</p>
                        )}
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
