import '../styling/DataCustodian.css';
import React, { useEffect, useState } from 'react';
import {FaRegEdit} from 'react-icons/fa';
import {RiDeleteBin6Fill} from 'react-icons/ri';
import ViewDataScope from './ViewDataScope';
import {EditDataScopePopup} from './EditDataScopePopup';
import {CreateDataScopePopup} from './CreateDataScopePopup';
import ViewAccessRequest from './ViewAccessRequest';
import EditAccessRequest from './EditAccessRequest';
import {ViewTask} from './ViewTaskPopup';
import {ViewDevice} from './ViewDevice';
import ViewSupportRequest from './ViewSupportRequest';
import {CreateRisk} from "./CreateRiskPopup";
import Requests from './Requests';
import '../styling/Dropdown.css';
import {ViewRisk} from "./ViewRisk";
import {EditRisk} from "./EditRisk";
/* eslint-disable react/prop-types */

const DataCustodian = ({currentTab}) => {
    const [showDatascope, setShowDatascope] = useState([]);
    const [createDataScopeOpen, setCreateDataScopeOpen] = useState(false);
    const [viewAccessRequestOpen, setViewAccessRequestOpen] = useState(false);
    const [editAccessRequestOpen, setEditAccessRequestOpen] = useState(false);
    const [viewTaskOpen, setViewTaskOpen] = useState(false);
    const [viewSupportRequestOpen, setViewSupportRequestOpen] = useState(false);
    const [createRiskOpen, setCreateRiskOpen] = useState(false);
    const [viewRiskOpen, setViewRiskOpen] = useState(false);
    const [showAsset, setShowAsset] = useState([]);
    const [editRiskOpen, setEditRiskOpen] = useState(false);

    useEffect(() => {
        fetch('http://localhost:8080/api/datascope/getDs', {
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
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            }
        })
            .then((res) => res.json())
            .then((result) => {
                setShowAsset(result);
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
            dataItems.push(<ViewDataScopeItem datascope={datascope} key={datascope.id} />)
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
        for (let k = 1; k < 30; k++) {
            accessRequests.push(
                <li key={k}>
                    <p onClick={() => setViewAccessRequestOpen(true)}>
                        Access Request {k}
                        {viewAccessRequestOpen ? (
                            <ViewAccessRequest
                                popupClose={() => setViewAccessRequestOpen(false)}
                                popupOpen={viewAccessRequestOpen}
                            />
                        ) : null}
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
        }
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
                <li key={l}>
                    <p onClick={() => setViewTaskOpen(true)}>
                        Task {l}
                        {viewTaskOpen ? (
                            <ViewTask
                                popupClose={() => setViewTaskOpen(false)}
                                popupOpen={viewTaskOpen}
                            />
                        ) : null}
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
        const risks = [];
        for (let y = 1; y < 30; y++) {
            risks.push(
                <li key={y}>
                    <p onClick={() => setViewRiskOpen(true)}>
                        Risk {y}
                        {viewRiskOpen ? (
                            <ViewRisk
                                popupClose={() => setViewRiskOpen(false)}
                                popupOpen={viewRiskOpen}
                            />
                        ) : null}
                    </p>{' '}
                    <FaRegEdit
                        className="EditRiskIcon"
                        onClick={() => setEditRiskOpen(true)}
                    />
                    {editRiskOpen ? (
                        <EditRisk
                            popupClose={() => setEditRiskOpen(false)}
                            popupOpen={editRiskOpen}
                        />
                    ) : null}


                    {/*<button*/}
                    {/*    className="reviewRiskButton"*/}
                    {/*    onClick={() => setReviewRiskOpen(true)}*/}
                    {/*>*/}
                    {/*    Review*/}
                    {/*</button>*/}
                    {/*{reviewRiskOpen ? (*/}
                    {/*    <ReviewRisk*/}
                    {/*        popupClose={() => setReviewRiskOpen(false)}*/}
                    {/*        popupOpen={reviewRiskOpen}*/}
                    {/*    />*/}
                    {/*) : null}*/}
                </li>
            );
        }
        return (
            <div className="display">
                <div className="risks">
                    <ul className="risksList">{risks}</ul>
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