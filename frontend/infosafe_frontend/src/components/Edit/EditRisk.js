import Popup from 'reactjs-popup';
import React, {useEffect, useState} from 'react';
import '../../styling/EditRisk.css';
import { IoArrowBackOutline } from 'react-icons/io5';
import Dropdown from 'react-dropdown';
import ViewDataScope from "../View/ViewDataScope";
import {useAccessRequests} from "../RequestRequests/AccessRequestRequests";
const PROBABILITY = ['Almost Certain', 'Likely', 'Moderate', 'Unlikely', 'Rare'];
const IMPACT = ['Insignificant', 'Minor', 'Significant', 'Major', 'Severe'];
const STATUS = ['Open', 'In Progress', 'Resolved'];
export const EditRisk = ({risk, popupClose, popupOpen, onRiskEdited}) => {
    const [datascope, setDataScope] = useState(risk.dataScope.ds_name);
    const {myDatascopeData} = useAccessRequests();
    const [values, setValues] = useState({
        risk_name: '',
        impact_rating: '',
        probability_rating: '',
        risk_description: '',
        suggested_mitigation: '',
        risk_status: '',
        dataScope: '',
    });

    useEffect(() => {
        if (risk) {
            setValues({
                risk_name: risk.risk_name,
                impact_rating: risk.impact_rating,
                probability_rating: risk.probability_rating,
                risk_description: risk.risk_description,
                suggested_mitigation: risk.suggested_mitigation,
                risk_status: "Open",
                dataScope_id: risk.dataScope.data_scope_id
            });
        }
    }, [risk]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(values)
        fetch('https://infosafe.live/api/risk/update/' + risk.risk_id, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            },
            body: JSON.stringify(values)
        }).then(() => {
            console.log("Updated Risk")
            onRiskEdited()
        })
        //console.log(JSON.stringify(values))
        popupClose()
    }

    return (
        <Popup risk={risk} open={popupOpen} closeOnDocumentClick={false}>
            <div className="editRiskOverlay">
                <div className="popupBackground">
                    <div className="borderEditRisk">
                        <button className="editRiskBackButton" onClick={popupClose} data-testid="back-button">
                            <IoArrowBackOutline className="editRiskBackIcon"/>
                        </button>
                        <form onSubmit={handleSubmit}>
                            <p className="editRiskPageTitle">Edit Risk</p>
                            <div className="editRiskContent">
                                <p className="editRiskInputTitle">Risk Name</p>
                                <input
                                    className="editRiskNameInput"
                                    type="text"
                                    id="editusername"
                                    name="editusername"
                                    data-testid="firstNameEdit"
                                    defaultValue={risk.risk_name}
                                    onChange={e => setValues({...values, risk_name: e.target.value})}
                                />
                                <p className="editRiskInputTitle">Probability</p>
                                <Dropdown
                                    options={PROBABILITY}
                                    value={risk.probability_rating}
                                    className="editRiskProbabilityDropdown"
                                    name="probabilityDropdown"
                                    onChange={(selectedOption) => setValues({
                                        ...values,
                                        probability_rating: selectedOption.value
                                    })}
                                />
                                <p className="editRiskInputTitle">Impact</p>
                                <Dropdown
                                    options={IMPACT}
                                    value={risk.impact_rating}
                                    className="editRiskImpactDropdown"
                                    name="impactDropdown"
                                    onChange={(selectedOption) => setValues({
                                        ...values,
                                        impact_rating: selectedOption.value
                                    })}
                                />
                                <p className="editRiskInputTitle">Vulnerability/Threat</p>
                                <textarea
                                    className="editRiskInputTextArea"
                                    defaultValue={risk.risk_description}
                                    onChange={e => setValues({...values, risk_description: e.target.value})}
                                />
                                <p className="editRiskStatusLabel">Risk Status</p>
                                <Dropdown
                                    options={STATUS}
                                    value={risk.risk_status}
                                    className="editRiskStatusDropdown"
                                    name="editRiskStatusDropdown"
                                    onChange={(e) => setValues({...values, risk_status: STATUS.value})}
                                />
                                <p className="editRiskDataScopeLabel">Data Scope</p>
                                {myDatascopeData && myDatascopeData.length > 0 ? (
                                    <Dropdown
                                        options={myDatascopeData.map((data) => ({value: data.data_scope_id, label: data.ds_name}))}
                                        value={datascope}
                                        className="editRiskDataScopeDropdown"
                                        name="editRiskDataScopeDropdown"
                                        onChange={(selectedOption) => setValues({...values, dataScope_id: selectedOption.value})}
                                    />
                                ) : (
                                    <p className="editRiskLoadTitle">Loading...</p>
                                )}
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

export default EditRisk;