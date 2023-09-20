import Popup from "reactjs-popup";
import React, {useState} from "react";
import "../../styling/CreateRisk.css";
import { IoArrowBackOutline } from "react-icons/io5";
import Dropdown from "react-dropdown";
import useRequestMaker from "./useRequestMaker";
import Select from "react-select";
const PROBABILITY = ["Almost Certain", "Likely", "Moderate","Unlikely","Rare"];
// const DATA_SCOPES = ["DATA SCOPE 1", "DATA SCOPE 2", "DATA SCOPE 3", "DATA SCOPE 4"];
const IMPACT = ["Insignificant","Minor","Significant","Major","Severe"];
const STATUS = ["Open", "In Progress", "Resolved", "Closed"];

export const CreateRisk = ({ popupClose, popupOpen }) => {
    const [datascope, setDataScope] = useState(null);
    const {datascopeData} = useRequestMaker();
    const[impact_rating, setImpactRating] = useState("")
    const[probability_rating, setProbabilityRating] = useState("")
    const[risk_description, setRiskDescription] = useState("")
    const[risk_status, setRiskStatus] = useState("")
    const[suggested_mitigation, setSuggestedMitigation] = useState("")

    const handleDescriptionChange = (e) => {
        setRiskDescription(e.target.value);
    };

    const handleMitigation = (e) => {
        setSuggestedMitigation(e.target.value);
    }
    const handleClick = (e)=> {
        e.preventDefault();
        const risk = {impact_rating, probability_rating, risk_description, risk_status, suggested_mitigation, dataScope_id: datascope.value,};
        console.log(risk);
        fetch("http://ec2-174-129-77-195.compute-1.amazonaws.com:8080/api/risk/addRisk", {
            method:"POST",
            headers:{"Content-Type":"application/json",
                Authorization: "Bearer " + sessionStorage.getItem("accessToken")
            },
            body:JSON.stringify(risk)
        }).then(()=>{
            console.log("New risk added")
        })
        popupClose()
    };

    return (
        <Popup open={popupOpen} closeOnDocumentClick={false}>
            <div className='createRiskOverlay'>
                <div className='borderCreateRisk'>
                    <button className='backButton' onClick={popupClose}>
                        <IoArrowBackOutline className='backIcon' />
                    </button>
                    <form>
                        <p className='pageTitle'>Create Risk</p>
                        <p className='inputTitle'>Probability</p>
                        <Dropdown
                            options={PROBABILITY}
                            value={PROBABILITY[0]}
                            className='probabilityDropdown'
                            name='probabilityDropdown'
                            onChange={(selectedOption) => setProbabilityRating(selectedOption.value)}
                        />
                        <p className='inputTitle'>Impact</p>
                        <Dropdown
                            options={IMPACT}
                            value={IMPACT[0]}
                            className='impactDropdown'
                            name='impactDropdown'
                            onChange={(selectedOption) => setImpactRating(selectedOption.value)}
                        />
                        <p className='inputTitle'>Risk Description</p>
                        <textarea
                            className='inputTextArea'
                            onChange={handleDescriptionChange}
                            value={risk_description}
                        />
                        <p className='inputTitle'>Risk Status</p>
                        <Dropdown
                            options={STATUS}
                            value={STATUS[0]}
                            className='statusDropdown'
                            name='statusDropdown'
                            onChange={(selectedOption) => setRiskStatus(selectedOption.value)}
                        />
                        <p className='inputTitle'>Suggested Mitigation</p>
                        <textarea
                            className='inputTextArea'
                            onChange={handleMitigation}
                            value={suggested_mitigation}
                        />
                        <p className='inputTitle'>Data Scope</p>
                        {datascopeData && datascopeData.length > 0 ? (
                            <Select
                                options={datascopeData.map((data) => ({value: data.data_scope_id, label: data.ds_name}))}
                                value={datascope}
                                className='accessRequestDatascopeDropdown'
                                name='datascopeDropdown'
                                placeholder={'Add DataScope'}
                                onChange={(selectedOption) => setDataScope(selectedOption)}
                            />
                        ) : (
                            <p className='loadTitle'>Loading...</p>
                        )}
                        <div>
                            <button className='submitButton' type='submit' onClick={handleClick}>
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Popup>
    );
};
