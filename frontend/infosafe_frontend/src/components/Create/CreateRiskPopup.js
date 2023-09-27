import Popup from 'reactjs-popup';
import React, {useState,  useEffect } from 'react';
import '../../styling/CreateRisk.css';
import '../../styling/Dropdown.css'
import { IoArrowBackOutline } from 'react-icons/io5';
import Dropdown from 'react-dropdown';
import useRequestMaker from "../Subsystems/useRequestMaker";
import Select from "react-select";
import {useAccessRequests} from "../RequestRequests/AccessRequestRequests";
const PROBABILITY = ['Almost Certain', 'Likely', 'Moderate','Unlikely','Rare'];
const IMPACT = ['Insignificant','Minor','Significant','Major','Severe'];
const STATUS = ["Open", "In Progress", "Resolved", "Closed"];

export const CreateRisk = ({ popupClose, popupOpen, onRiskAdded }) => {
    const[risk_name, setRisk_name] = useState('')
    const[impact_rating, setImpactRating] = useState(IMPACT[0])
    const[probability_rating, setProbabilityRating] = useState(PROBABILITY[0])
    const[risk_description, setRiskDescription] = useState('')
    const[suggested_mitigation, setSuggestedMitigation] = useState('')
    const [datascope, setDataScope] = useState(null);
    const {myDatascopeData} = useAccessRequests();
    const[risk_status, setRiskStatus] = useState("")

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

        if ( risk_name === '' || risk_description === '' || suggested_mitigation === '' || datascope === null ) {
            document.getElementById("createRiskError").style.display = "block";
            return;
        }

        const risk = {risk_name, impact_rating, probability_rating, risk_description, risk_status: "Open", suggested_mitigation, dataScope_id: datascope.value,};
        console.log(risk);
        fetch("http://localhost:8080/api/risk/addRisk", {
            method:"POST",
            headers:{"Content-Type":"application/json",
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            },
            body:JSON.stringify(risk)
        }).then(()=>{
            console.log("New risk added")
            onRiskAdded()
        })
        popupClose()
    };

    return (
        <Popup open={popupOpen} closeOnDocumentClick={false}>
            <div className="createRiskOverlay">
                <div className="popupBackground">
                    <div className="borderCreateRisk">
                        <button className="createRiskBackButton" onClick={popupClose} data-testid={"back-button"}>
                            <IoArrowBackOutline className="createRiskBackIcon" />
                        </button>
                        <form>
                            <p className="pageTitle">Create Risk</p>
                            <p className="riskNameLabel">Risk Name</p>
                            <textarea
                                className="riskNameInput"
                                onChange={handleNameChange}
                                value={risk_name}
                            />
                            <p className="riskProbabilityLabel">Probability</p>
                            <Dropdown
                                options={PROBABILITY}
                                value={PROBABILITY[0]}
                                className="createRiskProbabilityDropdown"
                                name="createRiskProbabilityDropdown"
                                onChange={(selectedOption) => setProbabilityRating(selectedOption.value)}
                            />
                            <p className="riskImpactLabel">Impact</p>
                            <Dropdown
                                options={IMPACT}
                                value={IMPACT[0]}
                                className="riskImpactDropdown"
                                name="riskImpactDropdown"
                                onChange={(selectedOption) => setImpactRating(selectedOption.value)}
                            />
                            <p className="riskDescriptionLabel">Risk Description</p>
                            <textarea
                                className="riskDescriptionInput"
                                onChange={handleDescriptionChange}
                                value={risk_description}
                            />
                            <p className="riskSuggestedMitigationLabel">Suggested Mitigation</p>
                            <textarea
                                className="riskSuggestedMitigationInput"
                                onChange={handleMitigation}
                                value={suggested_mitigation}
                            />
                            <p className="riskDataScopeLabel">Data Scope</p>
                            {myDatascopeData && myDatascopeData.length > 0 ? (
                                <Dropdown
                                    options={myDatascopeData.map((data) => ({value: data.data_scope_id, label: data.ds_name}))}
                                    value={datascope}
                                    className="riskDataScopeDropdown"
                                    name="riskDataScopeDropdown"
                                    placeholder={"Add DataScope"}
                                    onChange={(selectedOption) => setDataScope(selectedOption)}
                                />
                            ) : (
                                <p className="loadTitle">Loading...</p>
                            )}
                            <p className="createRiskError" id="createRiskError">Please ensure all fields are completed.</p>
                            <button className="createRiskSubmitButton" type="submit" onClick={handleClick}>
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Popup>
    );
};

export default CreateRisk;
