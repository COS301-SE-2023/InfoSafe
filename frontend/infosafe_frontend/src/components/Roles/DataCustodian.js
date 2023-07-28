import '../../styling/DataCustodian.css';
import React, { useEffect, useState } from 'react';
import {FaRegEdit} from 'react-icons/fa';
import {RiDeleteBin6Fill} from 'react-icons/ri';
import ViewDataScope from '../View/ViewDataScope';
import {EditDataScopePopup} from '../Edit/EditDataScopePopup';
import {CreateDataScopePopup} from '../Create/CreateDataScopePopup';
import ViewAccessRequest from '../View/ViewAccessRequest';
import EditAccessRequest from '../Edit/EditAccessRequest';
import {ViewTask} from '../View/ViewTaskPopup';
import {ViewDevice} from '../View/ViewDevice';
import ViewSupportRequest from '../View/ViewSupportRequest';
import {ReviewRisk} from "../ReviewRiskPopup";
import {CreateRisk} from "../Create/CreateRiskPopup";
import Requests from '../Requests';
import '../../styling/Dropdown.css';
/* eslint-disable react/prop-types */

const DataCustodian = ({currentTab}) => {
    const [showDatascope, setShowDatascope] = useState([]);
    const [showRisk, setShowRisk] = useState([]);
    const [showAccessRequest, setShowAccessRequest] = useState([]);
    const [createDataScopeOpen, setCreateDataScopeOpen] = useState(false);
    const [viewAccessRequestOpen, setViewAccessRequestOpen] = useState(false);
    const [editAccessRequestOpen, setEditAccessRequestOpen] = useState(false);
    const [viewMatrixOpen, setViewMatrixOpen] = useState(false);
    const [viewSupportRequestOpen, setViewSupportRequestOpen] = useState(false);
    const [createRiskOpen, setCreateRiskOpen] = useState(false);
    const [reviewRiskOpen, setReviewRiskOpen] = useState(false);
    const [showAsset, setShowAsset] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/datascope/getDs', {
            method: "GET",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            }
        })
            .then((res) => res.json())
            .then((result) => {
                setShowDatascope(result);
            });
    }, []);

    useEffect(() => {
        fetch('http://localhost:8080/api/asset/getAsset', {
            method: "GET",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            }
        })
            .then((res) => res.json())
            .then((result) => {
                setShowAsset(result);
            });
    }, []);

    useEffect(() => {
        fetch('http://localhost:8080/api/risk/getRisk', {
            method: "GET",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            }
        })
            .then((res) => res.json())
            .then((result) => {
                setShowRisk(result);
            });
    }, []);



    const ViewDataScopeItem = ({ datascope }) => {
        const [viewDataScopeOpen, setViewDataScopeOpen] = useState(false);
        const [editDataScopeOpen, setEditDataScopeOpen] = useState(false);
        return (
            <li key={datascope.id}>
                <p onClick={() => setViewDataScopeOpen(!viewDataScopeOpen)}>
                    Data Scope {datascope.id}: {datascope.ds_name} ------ {datascope.description}{' '}
                    ------ {datascope.data_custodian}
                    {viewDataScopeOpen && (
                        <ViewDataScope
                            popupClose={() => setViewDataScopeOpen(false)}
                            popupOpen={viewDataScopeOpen}
                            datascope={datascope}
                        />
                    )}
                </p>
                <FaRegEdit className="EditIcon" onClick={() => setEditDataScopeOpen(true)} />
                {editDataScopeOpen ? (
                    <EditDataScopePopup
                        popupClose={() => setEditDataScopeOpen(false)}
                        popupOpen={editDataScopeOpen}
                        datascope={datascope}
                    />
                ) : null}{' '}
                <RiDeleteBin6Fill className="DeleteIcon" />
            </li>
        );
    };

    const ViewRiskItem = ({risk}) => {
        const [createRiskOpen, setCreateRiskOpen] = useState(false);
        const [reviewRiskOpen, setReviewRiskOpen] = useState(false);
        return(
            <li key={risk.id}>
                <p onClick={() => setReviewRiskOpen(!reviewRiskOpen)}>
                    Risk {risk.risk_id}: {risk.risk_status}
                    {reviewRiskOpen && (
                        <ReviewRisk
                            popupClose={() => setReviewRiskOpen(false)}
                            risk={risk}
                        />
                    )}
                </p>
            </li>
        );
    };

    const ViewCompliance = ({compliance}) => {
        const [viewMatrixOpen, setViewMatrixOpen] = useState(false);
        return(
            <li key={compliance.id}>
                <p onClick={() => setViewTaskOpen(true)}>
                    {viewTaskOpen && (
                        <ViewTask
                            popupClose={() => setViewTaskOpen(false)}
                            popupOpen={viewTaskOpen}
                        />
                    )}
                </p>
            </li>
        )
    };

    const viewAccessItem = ({access}) => {
        const [viewAccessRequestOpen, setViewAccessRequestOpen] = useState(false);
        const [editAccessRequestOpen, setEditAccessRequestOpen] = useState(false);
        return(
            <li key={access.id}>
                <p onClick={() => setViewAccessRequestOpen(!viewAccessRequestOpen)}>
                    AccessRequest {access.request_id}
                    {reviewRiskOpen && (
                        <ViewAccessRequest
                            popupClose={() => setReviewRiskOpen(false)}
                            access={access}
                        />
                    )}
                </p>
                <FaRegEdit
                    className="EditIcon"
                    onClick={() => setEditAccessRequestOpen(true)}
                />
                {editAccessRequestOpen ? (
                    <EditAccessRequest
                        popupClose={() => setEditAccessRequestOpen(false)}
                        popupOpen={editAccessRequestOpen}
                    />
                ) : null}
                <RiDeleteBin6Fill className="DeleteIcon" />
            </li>
        );
    };

    const ViewDeviceItem = ({ asset }) => {
        const [viewDeviceOpen, setViewDeviceOpen] = useState(false);
        return (
            <li key={asset.id}>
                <p onClick={() => setViewDeviceOpen(!viewDeviceOpen)}>
                    Asset {asset.id}: {asset.asset_name} ----- {asset.asset_description}
                    {viewDeviceOpen && (
                        <ViewDevice
                            popupClose={() => setViewDeviceOpen(false)}
                            popupOpen={viewDeviceOpen}
                            asset={asset}
                        />
                    )}
                </p>
            </li>
        );
    };

    if (currentTab === 1)
    {
        const dataItems = [];
        showDatascope.map((datascope) =>
            dataItems.push(<ViewDataScope datascope={datascope} key={datascope.id} />)
        );

        return (
            <div className="display">
                <div className="datascopes">
                    <ul className="datascopesList">{dataItems}</ul>
                </div>
                <div className="CreateDataScopeDiv">
                    <button
                        className="CreateDataScopeButton"
                        onClick={() => setCreateDataScopeOpen(true)}
                    >
                        Create Data Scope
                    </button>
                    {createDataScopeOpen ? (
                        <CreateDataScopePopup
                            popupClose={() => setCreateDataScopeOpen(false)}
                            popupOpen={createDataScopeOpen}
                        />
                    ) : null}
                </div>
            </div>
        );
    }

    if (currentTab === 2)
    {
        const accessRequests = [];
        showAccessRequest.map((accessRequest) =>
            accessRequests.push(<ViewAccessRequest asset={accessRequest} key={accessRequest.request_id} />)
        );
        return (
            <div className="display">
                <div className="accessRequests">
                    <ul className="accessrequestsList">{accessRequests}</ul>
                </div>
            </div>
        );
    }

    if (currentTab === 3)
    {
        const complianceItems = [];
        for (let l = 1; l < 30; l++) {
            complianceItems.push(

                    </p>
                </li>
            );
        }
        return (
            <div className="display">
                <div className="tasks">
                    <ul className="taskList">{complianceItems}</ul>
                </div>
            </div>
        );
    }

    if (currentTab === 4)
    {
        const devices = [];
        showAsset.map((device) =>
            devices.push(<ViewDeviceItem asset={device} key={device.id} />)
        );
        return (
            <div className="display">
                <div className="devices">
                    <ul className="deviceList">{devices}</ul>
                </div>
            </div>
        );
    }

    if (currentTab === 5)
    {
        const my_requests = [];
        for (let b = 1; b < 15; b++) {
            my_requests.push(
                <li key={b}>
                    <p onClick={() => setViewSupportRequestOpen(true)}>
                        Support Request {b}
                        {viewSupportRequestOpen ? (
                            <ViewSupportRequest
                                popupClose={() => setViewSupportRequestOpen(false)}
                                popupOpen={viewSupportRequestOpen}
                            />
                        ) : null}
                    </p>
                </li>
            );
        }

        return (
            <div className="display">
                <div className="mySupportRequests">
                    <ul className="mySupportRequestsList">{my_requests}</ul>
                </div>
            </div>
        );
    }

    if (currentTab === 6)
    {
        const riskItems = [];
        showRisk.map((risks) => riskItems.push(<ViewRiskItem risk={risks} key={risks.risk_id}/>));

        return (
            <div className="display">
                <div className="risks">
                    <ul className="risksList">{riskItems}</ul>
                </div>
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
            </div>
        );
    }

    if (currentTab === 7)
    {
        return <Requests userRole="Data Custodian" />;
    }


};

export default DataCustodian;