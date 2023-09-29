import React, {useEffect, useState} from "react";
import {ViewRisk} from "../View/ViewRisk";
import {FaRegEdit, FaSearch} from "react-icons/fa";
import {EditRisk} from "../Edit/EditRisk";
import {ReviewRisk} from "../Reviews/ReviewRiskPopup";
import {CreateRisk} from "../Create/CreateRiskPopup";
import "../../styling/Risks.css";
import {useGetPerms} from "../getData/getPerms";
import {useGetRisk} from "../getData/getRisk";
import {RiEditBoxFill} from "react-icons/ri";
import {HelpPopup} from "../HelpPopup";
import {IoHelpCircle} from 'react-icons/io5';
import risk_help from "../../images/risk_help.png";

export const Risks = () => {
    const [createRiskOpen, setCreateRiskOpen] = useState(false);
    const {showRisk, loading, fetchAllRisks} = useGetRisk();
    const {roles} = useGetPerms();

    useEffect(() => {
        fetchAllRisks();
    }, []);

    const CreateRiskDiv = () => {
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
                            onRiskAdded={fetchAllRisks}
                        />
                    ) : null}
                </div>
            )
        } else {
            return (null)
        }
    }

    const EditRiskDiv = ({risk}) => {
        const [editRiskOpen, setEditRiskOpen] = useState(false);
        if(roles.includes("risks_edit")) {
            return (
                <div className="taskEditButton">
                    <RiEditBoxFill className="taskEditIcon"
                                   onClick={() => setEditRiskOpen(true)}
                    />
                    {editRiskOpen ? (
                        <EditRisk
                            popupClose={() => setEditRiskOpen(false)}
                            popupOpen={editRiskOpen}
                            risk={risk}
                            onRiskEdited={fetchAllRisks}
                        />
                    ) : null}
                </div>
            );
        } else {
            return (null)
        }
    }

    const ReviewRiskDiv = ({risk}) => {
        const [reviewRiskOpen, setReviewRiskOpen] = useState(false);
        if(roles.includes("risks_review")) {
            return (
                <div className="reviewRiskButtonDiv">
                    <button  className="reviewRiskButton"
                        onClick={() => setReviewRiskOpen(true)}>
                        Review
                    </button>
                    {reviewRiskOpen ? (
                        <ReviewRisk
                            popupClose={() => setReviewRiskOpen(false)}
                            popupOpen={reviewRiskOpen}
                            risk={risk}
                            onRiskReview={fetchAllRisks}
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
        if (roles.includes("risk_edit") || roles.includes("risks_create") || roles.includes("risks_review"))
        return (
            <li className="risksListItem" key={risk.risk_id}>
                <p className="risksListItemName" onClick={() => setViewRiskOpen(!viewRiskOpen)}>
                    Risk {risk.risk_id} : {risk.risk_name}
                    {viewRiskOpen ? (
                        <ViewRisk
                            popupClose={() => setViewRiskOpen(false)}
                            popupOpen={viewRiskOpen}
                            risk={risk}
                        />
                    ) : null}
                </p>
                <ReviewRiskDiv risk={risk}></ReviewRiskDiv>
                <EditRiskDiv risk={risk}></EditRiskDiv>
            </li>
        )
    }

    const risks = [];
    showRisk.map((risk) =>
        risks.push(<ViewRisks risk={risk} key={risk.risk_id}/>)
    )
    if (risks.length === 0)
    {
        risks[0] = "No Risks added yet.";
    }

    const [helpOpen, setHelpOpen] = useState(false);

    return(
        <div className="display">
            <div className="risksBackground">
                <button  className="risksHelpButton" onClick={() => setHelpOpen(true)}>
                    <IoHelpCircle className="helpPopupIcon"></IoHelpCircle>
                    {helpOpen ? (
                        <HelpPopup
                            popupClose={() => setHelpOpen(false)}
                            popupOpen={helpOpen}
                            image={risk_help}
                        />
                    ) : null}
                </button>
                <div className="searchRisks">
                    {/*<input
                        // data-testid="riskSearch"
                        className="riskSearchInput"
                        type="text"
                        id="riskSearchInput"
                        name="riskSearch"
                        // onChange={}
                    />
                    <FaSearch className="deviceSearchIcon" />*/}
                </div>
                <div className="risks">
                    {loading ? (
                        <div className="loadingScreen">
                            <div className="loadingDiv">
                                <div className="loading"></div>
                            </div>
                        </div>
                    ) : (
                    <ul className="risksList">{risks}</ul>
                        )}
                </div>
                <CreateRiskDiv></CreateRiskDiv>
            </div>
        </div>
    )
}