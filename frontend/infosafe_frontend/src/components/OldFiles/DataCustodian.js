import '../../styling/DataCustodian.css';
import '../../styling/Dropdown.css';
import React, { useState } from 'react';
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
import {CreateRisk} from "../Create/CreateRiskPopup";
import Requests from '../Create/Requests';
import {ViewRisk} from "../View/ViewRisk";
import {EditRisk} from "../Edit/EditRisk";
import AccessAndDisplay from "../Roles/AccessAndDisplay";
/* eslint-disable react/prop-types */

const DataCustodian = ({currentTab}) => {
    const {showDatascope, showAsset,  showRisk, showAccess,  showTask,showMySupport} = AccessAndDisplay()
    const [createDataScopeOpen, setCreateDataScopeOpen] = useState(false); // DS
    // const [viewTaskOpen, setViewTaskOpen] = useState(false); // ISO DS DISO Employee AM
    // const [editRiskOpen, setEditRiskOpen] = useState(false); // ISO DS DISO
    const [createRiskOpen, setCreateRiskOpen] = useState(false);
    // const [viewDataScopeOpen, setViewDataScopeOpen] = useState(false);
    // const [editDataScopeOpen, setEditDataScopeOpen] = useState(false);
    // const [viewAccessRequestOpen, setViewAccessRequestOpen] = useState(false); // ISO DISO
    // const [editAccessRequestOpen, setEditAccessRequestOpen] = useState(false); // ISO DISO
    // const [viewMatrixOpen, setViewMatrixOpen] = useState(false);
    // const [viewSupportRequestOpen, setViewSupportRequestOpen] = useState(false); // ISO DISO Employee AM
    // const [editSupportRequestOpen, setEditSupportRequestOpen] = useState(false); // ISO DISO

    const ViewDataScopeItemDs = ({ datascope }) => {
        const [viewDataScopeOpen, setViewDataScopeOpen] = useState(false);
        const [editDataScopeOpen, setEditDataScopeOpen] = useState(false);
        return (
            <li key={datascope.data_scope_id}>
                <p onClick={() => setViewDataScopeOpen(!viewDataScopeOpen)}>
                    Data Scope {datascope.data_scope_id}: {datascope.ds_name}{' '}{datascope.description}
                    {viewDataScopeOpen && (
                        <ViewDataScope
                            popupClose={() => setViewDataScopeOpen(false)}
                            popupOpen={viewDataScopeOpen}
                            datascope={datascope}
                        />
                    )}
                </p>
                <FaRegEdit className="EditIcon" onClick={() => setEditDataScopeOpen(!editDataScopeOpen)} />
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
            <li key={asset.asset_id}>
                <p onClick={() => setViewDeviceOpen(!viewDeviceOpen)}>
                    Asset {asset.asset_id}: {asset.asset_name} ----- {asset.asset_description}
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

    const ViewAccessRequests = ({ access }) => {
        const [viewAccessRequestOpen, setViewAccessRequestOpen] = useState(false); // ISO DISO
        const [editAccessRequestOpen, setEditAccessRequestOpen] = useState(false); // ISO DISO
        return (
            <li key={access.request_id}>
                <p onClick={() => setViewAccessRequestOpen(!viewAccessRequestOpen)}>
                    Access Request:{' '}{access.request_id}
                    {viewAccessRequestOpen ? (
                        <ViewAccessRequest
                            popupClose={() => setViewAccessRequestOpen(false)}
                            popupOpen={viewAccessRequestOpen}
                        />
                    ) : null}
                </p>
                <FaRegEdit
                    className="EditIcon"
                    onClick={() => setEditAccessRequestOpen(!editAccessRequestOpen)}
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
    const ViewRisks = ({ risk }) => {
        const [editRiskOpen, setEditRiskOpen] = useState(false);
        const [viewRiskOpen, setViewRiskOpen] = useState(false);
        return (
        <li key={risk.risk_id}>
            <p onClick={() => setViewRiskOpen(!viewRiskOpen)}>
                Risk {risk.risk_id}
                {viewRiskOpen ? (
                    <ViewRisk
                        popupClose={() => setViewRiskOpen(false)}
                        popupOpen={viewRiskOpen}
                    />
                ) : null}
            </p>{' '}
            <FaRegEdit
                className="EditIcon"
                onClick={() => setEditRiskOpen(editRiskOpen)}
            />
            {editRiskOpen ? (
                <EditRisk
                    popupClose={() => setEditRiskOpen(false)}
                    popupOpen={editRiskOpen}
                />
            ) : null}
        </li>
        );
    };

    const ViewSupportRequests = ({ mySupport }) => {
        const [viewSupportRequestOpen, setViewSupportRequestOpen] = useState(false); // ISO DISO Employee AM
        return(
            <li key={mySupport.support_id}>
                <p onClick={() => setViewSupportRequestOpen(true)}>
                    Support Request {mySupport.support_id}
                    {viewSupportRequestOpen ? (
                        <ViewSupportRequest
                            popupClose={() => setViewSupportRequestOpen(false)}
                            popupOpen={viewSupportRequestOpen}
                            support={mySupport}
                        />
                    ) : null}
                </p>
            </li>
        );
    };

    if (currentTab === 1) { // Datascopes
        const dataItems = [];
        showDatascope.map((datascope) =>
            dataItems.push(<ViewDataScopeItemDs datascope={datascope} key={datascope.data_scope_id} />)
        );

        return (
            <div className="display">
                <div className="datascopes">
                    <ul className="datascopesList">{dataItems}</ul>
                </div>
                <div className="CreateDataScopeDiv">
                    <button
                        className="CreateDataScopeButton"
                        data-testid="dataScopeMake"
                        onClick={() => setCreateDataScopeOpen(!createDataScopeOpen)}
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
    if (currentTab === 2) { // Access Requests
        const accessRequests = [];
        showAccess.map((access) =>
            accessRequests.push(<ViewAccessRequests access={access} key={access.request_id}/>)
        );
        return (
            <div className="display">
                <div className="accessRequests">
                    <ul className="accessrequestsList">{accessRequests}</ul>
                </div>
            </div>
        );
    }

    if (currentTab === 3) { // compliance matrix
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

    if (currentTab === 4) // assets
    {
        const devices = [];
        showAsset.map((device) =>
            devices.push(<ViewDeviceItem asset={device} key={device.device_id} />)
        );
        return (
            <div className="display">
                <div className="devices">
                    <ul className="deviceList">{devices}</ul>
                </div>
            </div>
        );
    }

    if (currentTab === 5) //support requests
    {
        const my_requests = [];
        showMySupport.map((mySupport) =>
            my_requests.push(<ViewSupportRequests mySupport={mySupport} key={mySupport.support_id}/>)
        );
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
        showRisk.map((risk) =>
            risks.push(<ViewRisks risk={risk} key={risk.risk_id}/>)
        )
        return (
            <div className="display">
                <div className="risks">
                    <ul className="risksList">{risks}</ul>
                </div>
                <div className="CreateRiskButtonDiv">
                    <button
                        className="CreateRiskButton"
                        data-testid="CreateRiskButton"
                        onClick={() => setCreateRiskOpen(!createRiskOpen)}
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