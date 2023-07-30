import '../../styling/AssetManager.css';
import React, { useEffect, useState } from 'react';
import {FaRegEdit} from 'react-icons/fa';
import {RiDeleteBin6Fill} from 'react-icons/ri';
import {ViewTask} from '../View/ViewTaskPopup';
import {CreateDevicePopup} from '../Create/CreateDevicePopup';
import {ViewDevice} from '../View/ViewDevice';
import EditDevice from '../Edit/EditDevice';
import ViewSupportRequest from '../View/ViewSupportRequest';
import Requests from '../Requests';
import '../../styling/Dropdown.css';
import ViewDataScope from "../View/ViewDataScope";
import {EditDataScopePopup} from "../Edit/EditDataScopePopup";
import ViewAssetRequest from '../View/ViewAssetRequest';
import AccessAndDisplay from "./AccessAndDisplay";
import EditSupportRequest from "../Edit/EditSupportRequest";
/* eslint-disable react/prop-types */

const AssetManager = ({currentTab}) => {
    const {showDatascope,  showAsset,     showMySupport, showAssetRequests} = AccessAndDisplay()
    const [viewAssetRequestOpen, setViewAssetRequestOpen] = useState(false); // AM
    const [viewSupportRequestOpen, setViewSupportRequestOpen] = useState(false); // ISO DISO Employee AM
    const [createDeviceOpen, setCreateDeviceOpen] = useState(false); // ISO DISO AM
    const [viewTaskOpen, setViewTaskOpen] = useState(false); // ISO DS DISO Employee AM

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

    const ViewMySupport = ({ mySupport }) => {
        const [viewSupportRequestOpen, setViewSupportRequestOpen] = useState(false); // ISO DISO Employee AM
        const [editSupportRequestOpen, setEditSupportRequestOpen] = useState(false); // ISO DISO
        return(
            <li key={mySupport.support_id}>
                <p onClick={() => setViewSupportRequestOpen(true)}>
                    Support Request {mySupport.support_id}
                    {viewSupportRequestOpen ? (
                        <ViewSupportRequest
                            popupClose={() => setViewSupportRequestOpen(!viewSupportRequestOpen)}
                            popupOpen={viewSupportRequestOpen}
                        />
                    ) : null}
                </p>{' '}
                <FaRegEdit
                    className="EditIcon"
                    onClick={() => setEditSupportRequestOpen(!editSupportRequestOpen)}
                />
                {editSupportRequestOpen ? (
                    <EditSupportRequest
                        popupClose={() => setEditSupportRequestOpen(false)}
                        popupOpen={editSupportRequestOpen}
                    />
                ) : null}
            </li>
        );
    };

    const ViewAssetRequests = ({ assetRequest }) => {
        const [viewAssetRequestOpen, setViewAssetRequestOpen] = useState(false); // AM
        return(
            <li key={assetRequest.asset_request_id}>
            <p onClick={() => setViewAssetRequestOpen(!viewAssetRequestOpen)}>
                Asset Request {assetRequest.asset_request_id}
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
    };
    const ViewTaskItems = ({ task }) => {
        const [viewTaskOpen, setViewTaskOpen] = useState(false);
        return(
            <li key={task.task_id}>
                <p onClick={() => setViewTaskOpen(!viewTaskOpen)}>
                    Task {task.task_id}
                    {viewTaskOpen ? (
                        <ViewTask
                            popupClose={() => setViewTaskOpen(false)}
                            popupOpen={viewTaskOpen}
                        />
                    ) : null}
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
            </div>
        );
    }

    if (currentTab === 3)
    {
        const complianceItems = [];
        showTask.map((task) =>
            complianceItems.push(<ViewTaskItems task={task} key={task.task_id}/>)
        );
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
        showMySupport.map((mySupport) =>
            my_requests.push(<ViewMySupport mySupport={mySupport} key={mySupport.support_id}/>)
        );

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
        showAssetRequests.map((assetRequest) =>
            assetRequest.push(<ViewAssetRequests assetRequest={assetRequest} key={assetRequest.asset_request_id}/>)
        );

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