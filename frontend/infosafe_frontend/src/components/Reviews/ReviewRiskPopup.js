import Popup from 'reactjs-popup';
import React, { useEffect, useState } from 'react';
import '../../styling/ReviewRisk.css';
import { IoArrowBackOutline } from 'react-icons/io5';
import Dropdown from 'react-dropdown';

const PROBABILITY = ['Almost Certain', 'Likely', 'Moderate', 'Unlikely', 'Rare'];
const IMPACT = ['Insignificant', 'Minor', 'Significant', 'Major', 'Severe'];
const STATUS = ['Open', 'Accept', 'Avoid', 'Transfer', 'Mitigate'];

export const ReviewRisk = ({ risk, popupClose, popupOpen, onRiskReview }) => {
    const [currentStatus, setCurrentStatus] = useState(STATUS[0]);
    const [newStatus, setNewStatus] = useState('');

    const handleReview = () => {
        popupClose();
        if (newStatus !== currentStatus) {
            const payload = {
                risk_id: risk.risk_id,
                risk_status: newStatus,
                risk_name: risk.risk_name,
                ds_id: risk.dataScope.data_scope_id
            };
            if (newStatus !== "OPEN") {
                fetch('https://infosafe.live/api/risk/review', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + sessionStorage.getItem('accessToken'),
                    },
                    body: JSON.stringify(payload),
                })
                    .then(() => {
                        console.log('Done');
                        onRiskReview();
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                        // Handle the error here (e.g., show a message to the user)
                    });
            }
        }
    };

    useEffect(() => {
        setCurrentStatus(risk.risk_status);
    }, [risk.risk_status]);

    return (
        <Popup open={popupOpen} closeOnDocumentClick={false}>
            <div className="reviewRiskOverlay">
                <div className="popupBackground">
                    <div className="borderReviewRisk">
                        <button className="reviewRiskBackButton" onClick={popupClose} data-testid={"back-button"}>
                            <IoArrowBackOutline className="reviewRiskBackIcon" />
                        </button>
                        <form>
                            <p className="pageTitle">Review Risk</p>
                            <p className="reviewRiskLabels">Data Scope</p>
                            <p className="reviewRiskDisplayData">{risk.dataScope.ds_name}</p>
                            <p className="reviewRiskLabels">Probability</p>
                            <Dropdown
                                options={PROBABILITY}
                                value={risk.probability_rating}
                                className="reviewRiskProbabilityDropdown"
                                name="reviewRiskProbabilityDropdown"
                            />
                            <p className="reviewRiskLabels">Impact</p>
                            <Dropdown
                                options={IMPACT}
                                value={risk.impact_rating}
                                className="reviewRiskImpactDropdown"
                                name="reviewRiskImpactDropdown"
                            />
                            <p className="reviewRiskLabels">Status</p>
                            <Dropdown
                                options={STATUS}
                                value={newStatus}
                                placeholder={"Open"}
                                className="reviewRiskStatusDropdown"
                                name="reviewRiskStatusDropdown"
                                onChange={(selectedOption) => setNewStatus(selectedOption.value)}
                            />
                            <div>
                                <button className="reviewRiskSubmitButton" type="button" onClick={handleReview}>
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Popup>
    );
};

export default ReviewRisk;
