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
    })

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
            console.log("Updated Asset")
        })
        //console.log(JSON.stringify(values))
        popupClose()
    }

    return (
        <Popup risk={risk} open={popupOpen} closeOnDocumentClick={false}>
            <div className="editRiskOverlay">
                <div className="borderEditRisk">
                    <button className="backButton" onClick={popupClose}>
                        <IoArrowBackOutline className="backIcon" />
                    </button>
                    <form onSubmit={handleSubmit}>
                        <p className="pageTitle">Edit Risk</p>
                        <p className="displayTitle">{risk.risk_id} : {risk.risk_description}</p>
                        <p className="displayData">{risk.data_scope_id}</p>
                        <p className="inputTitle">Probability</p>
                        <Dropdown
                            options={PROBABILITY}
                            value={risk.probability_rating}
                            className="probabilityDropdown"
                            name="probabilityDropdown"
                            onChange={(selectedOption) => setValues({...values, probability_rating: selectedOption.value})}
                        />
                        <p className="inputTitle">Impact</p>
                        <Dropdown
                            options={IMPACT}
                            value={risk.impact_rating}
                            className="impactDropdown"
                            name="impactDropdown"
                            onChange={(selectedOption) => setValues({...values, impact_rating: selectedOption.value})}
                        />
                        <p className="inputTitle">Vulnerability/Threat</p>
                        <textarea
                            className="inputTextArea"
                            defaultValue={risk.risk_description}
                            onChange={e => setValues({...values, risk_description: e.target.value})}
                        />
                        <div>
                            <button className="submitButton" type="submit">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Popup>
    );
};