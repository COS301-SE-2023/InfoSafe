import Popup from 'reactjs-popup';
import React, {useEffect, useState} from 'react';
import '../../styling/EditRisk.css';
import { IoArrowBackOutline } from 'react-icons/io5';
import Dropdown from 'react-dropdown';
/* eslint-disable react/prop-types */
/* eslint-disable  no-unused-vars */
const PROBABILITY = ['Almost Certain', 'Likely', 'Moderate','Unlikely','Rare'];
const IMPACT = ['Insignificant','Minor','Significant','Major','Severe'];
export const EditRisk = ({ risk, popupClose, popupOpen }) => {

    const[values, setValues]=useState({
        risk_id: '',
        dataScope_id: '',
        risk_description: '',
        impact_rating: '',
        probability_rating: '',
        suggested_mitigation: '',
        risk_status: ''
    });

    useEffect(() => {
        if (risk) {
            setValues({
                risk_id: risk.risk_id,
                dataScope_id: risk.dataScope_id,
                risk_description: risk.risk_description,
                impact_rating: risk.impact_rating,
                probability_rating: risk.probability_rating,
                suggested_mitigation: risk.suggested_mitigation,
                risk_status: risk.risk_status
            });
        }
    }, [risk]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values)
        fetch('http://localhost:8080/api/risk/update/' + risk.risk_id, {
            method:"PUT",
            headers:{"Content-Type":"application/json",
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            },
            body:JSON.stringify(values)
        }).then(()=>{
            console.log("Updated Risk")
        })
        //console.log(JSON.stringify(values))
        popupClose()
    }

    return (
        <Popup risk={risk} open={popupOpen} closeOnDocumentClick={false}>
            <div className="editRiskOverlay">
                <div className="popupBackground">
                <div className="borderEditRisk">
                    <button className="editRiskBackButton" onClick={popupClose}>
                        <IoArrowBackOutline className="editRiskBackIcon" />
                    </button>
                    <form onSubmit={handleSubmit}>
                        <p className="editRiskPageTitle">Edit Risk</p>
                        <div className="editRiskContent">
                        <p className="editRiskInputTitle">Data Scope</p>
                        <p className="editRiskDisplayData">{risk.dataScope.ds_name}</p>
                        <p className="editRiskInputTitle">Probability</p>
                        <Dropdown
                            options={PROBABILITY}
                            value={risk.probability_rating}
                            className="editRiskProbabilityDropdown"
                            name="probabilityDropdown"
                            onChange={(selectedOption) => setValues({...values, probability_rating: selectedOption.value})}
                        />
                        <p className="editRiskInputTitle">Impact</p>
                        <Dropdown
                            options={IMPACT}
                            value={risk.impact_rating}
                            className="editRiskImpactDropdown"
                            name="impactDropdown"
                            onChange={(selectedOption) => setValues({...values, impact_rating: selectedOption.value})}
                        />
                        <p className="editRiskInputTitle">Vulnerability/Threat</p>
                        <textarea
                            className="editRiskInputTextArea"
                            defaultValue={risk.risk_description}
                            onChange={e => setValues({...values, risk_description: e.target.value})}
                        />
                        <div>
                            <button className="editRiskSubmitButton" type="submit">
                                Submit
                            </button>
                        </div>
                        </div>
                    </form>
                </div>
                </div>
            </div>
        </Popup>
    );
};