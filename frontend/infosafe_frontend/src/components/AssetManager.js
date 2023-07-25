import '../styling/AssetManager.css';
import React, { useEffect, useState } from 'react';
import {FaRegEdit} from 'react-icons/fa';
import {RiDeleteBin6Fill} from 'react-icons/ri';
import {ViewTask} from './ViewTaskPopup';
import {CreateDevicePopup} from './CreateDevicePopup';
import {ViewDevice} from './ViewDevice';
import EditDevice from './EditDevice';
import ViewSupportRequest from './ViewSupportRequest';
import Requests from './Requests';
import '../styling/Dropdown.css';
import ViewDataScope from "./ViewDataScope";
import {EditDataScopePopup} from "./EditDataScopePopup";
import ViewAssetRequest from './ViewAssetRequest';
/* eslint-disable react/prop-types */

const AssetManager = ({currentTab}) => {
    const [viewTaskOpen, setViewTaskOpen] = useState(false);
    const [createDeviceOpen, setCreateDeviceOpen] = useState(false);
    const [viewSupportRequestOpen, setViewSupportRequestOpen] = useState(false);
    const [showAsset, setShowAsset] = useState([]);
    const [showDatascope, setShowDatascope] = useState([]);
    const [viewAssetRequestOpen, setViewAssetRequestOpen] = useState(false);

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

    const ViewDeviceItem = ({ asset }) => {
        const [editDeviceOpen, setEditDeviceOpen] = useState(false);
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
                <FaRegEdit className="EditIcon" onClick={() => setEditDeviceOpen(true)} />
                {editDeviceOpen ? (
                    <EditDevice
                        popupClose={() => setEditDeviceOpen(false)}
                        popupOpen={editDeviceOpen}
                        asset={asset}
                    />
                ) : null}{' '}
                <RiDeleteBin6Fill className="DeleteIcon" />
            </li>
        );
    };

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
                {/*<div className="CreateDataScopeDiv">*/}
                {/*    <button*/}
                {/*        className="CreateDataScopeButton"*/}
                {/*        onClick={() => setCreateDataScopeOpen(true)}*/}
                {/*    >*/}
                {/*        Create Data Scope*/}
                {/*    </button>*/}
                {/*    {createDataScopeOpen ? (*/}
                {/*        <CreateDataScopePopup*/}
                {/*            popupClose={() => setCreateDataScopeOpen(false)}*/}
                {/*            popupOpen={createDataScopeOpen}*/}
                {/*        />*/}
                {/*    ) : null}*/}
                {/*</div>*/}
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
                <div className="AddDeviceDiv">
                    <button
                        className="AddDeviceButton"
                        onClick={() => setCreateDeviceOpen(true)}
                    >
                        Add Device
                    </button>
                    {createDeviceOpen ? (
                        <CreateDevicePopup
                            popupClose={() => setCreateDeviceOpen(false)}
                            popupOpen={createDeviceOpen}
                        />
                    ) : null}
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

    if (currentTab === 7)
    {
        return <Requests userRole="Asset Manager" />;
    }
    if (currentTab === 8)
    {
        const assetRequests = [];
        for (let i = 1; i < 30; i++) {
            assetRequests.push(
                <li key={i}>
                    <p onClick={() => setViewAssetRequestOpen(true)}>
                        Asset Request {i}
                        {viewAssetRequestOpen ? (
                        <ViewAssetRequest
                                popupClose={() => setViewAssetRequestOpen(false)}
                                popupOpen={viewAssetRequestOpen}
                            />
                        ) : null}
                        <button
                            className="reviewAssetRequestButton"
                            // onClick={() => setAssetRequestOpen(true)}
                        >
                            Review
                        </button>

                    </p>
                </li>
            );
        }

        return (
            <div className="display">
                <div className="assetRequests">
                    <ul className="assetRequestsList">{assetRequests}</ul>
                </div>
            </div>
        );
    }


};

export default AssetManager;