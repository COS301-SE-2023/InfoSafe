import React, {useState} from "react";
import AccessAndDisplay from "../Roles/AccessAndDisplay";
import {ViewRisk} from "../View/ViewRisk";
import {FaRegEdit} from "react-icons/fa";
import {EditRisk} from "../Edit/EditRisk";
import {ReviewRisk} from "../ReviewRiskPopup";
import {CreateRisk} from "../Create/CreateRiskPopup";

export const Risks = () => {
    const [createRiskOpen, setCreateRiskOpen] = useState(false);
    const {showRisk, roles} = AccessAndDisplay()

    const CreateRisk = () => {
        if(roles.includes("risks_create")) {
            return (
                <div className="CreateRiskButtonDiv">
                    <button
                        className="CreateRiskButton"
                        data-testid="CreateRiskButton"
                        onClick={() => setCreateRiskOpen(true)}
                    >
                        Create Risk
                    </button>
                    {createRiskOpen ? (
                        <CreateRisk
                            popupClose={() => setCreateRiskOpen(false)}
                            popupOpen={createRiskOpen}
                        />
                    ) : null}
                </div>
            )
        } else {
            return (null)
        }
    }

    const EditRisk = ({risk}) => {
        const [editRiskOpen, setEditRiskOpen] = useState(false);
        if(roles.includes("risks_edit")) {
            return (
                <div className="ISOEditIcon">
                    <FaRegEdit
                        onClick={() => setEditRiskOpen(true)}
                    />
                    {editRiskOpen ? (
                        <EditRisk
                            popupClose={() => setEditRiskOpen(false)}
                            popupOpen={editRiskOpen}
                            risk={risk}
                        />
                    ) : null}
                </div>
            )
        } else {
            return (null)
        }
    }

    const ReviewRisk = ({risk}) => {
        const [reviewRiskOpen, setReviewRiskOpen] = useState(false);
        if(roles.includes("risks_review")) {
            return (
                <div className="ISOReviewRiskButton">
                    <button
                        onClick={() => setReviewRiskOpen(true)}>
                        Review
                    </button>
                    {reviewRiskOpen ? (
                        <ReviewRisk
                            popupClose={() => setReviewRiskOpen(false)}
                            popupOpen={reviewRiskOpen}
                            risk={risk}
                        />
                    ) : null}
                </div>
            )
        } else {
            return (null)
        }
    }

    const ViewRisks = ({ risk }) => {
        const [viewRiskOpen, setViewRiskOpen] = useState(false);
        if (risks.includes("risk_edit") || risks.includes("risks_create") || risks.includes("risks_review"))
        return (
            <li className="ISOrisksListItem" key={risk.risk_id}>
                <p className="ISOrisksListItemName" onClick={() => setViewRiskOpen(!viewRiskOpen)}>
                    Risk {risk.risk_id}
                    {viewRiskOpen ? (
                        <ViewRisk
                            popupClose={() => setViewRiskOpen(false)}
                            popupOpen={viewRiskOpen}
                            risk={risk}
                        />
                    ) : null}
                </p>
                <ReviewRisk></ReviewRisk>
                <EditRisk></EditRisk>
            </li>
        )
    }

    const risks = [];
    showRisk.map((risk) =>
        risks.push(<ViewRisks risk={risk} key={risk.risk_id}/>)
    )

    return(
        <div className="display">
            <div className="risks">
                <ul className="ISOrisksList">{risks}</ul>
            </div>
            <CreateRisk></CreateRisk>
        </div>
    )
}