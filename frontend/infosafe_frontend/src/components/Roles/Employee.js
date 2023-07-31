import '../../styling/Employee.css';
import React, { useEffect, useState } from 'react';
import {ViewTask} from '../View/ViewTaskPopup';
import {ViewDevice} from '../View/ViewDevice';
import ViewSupportRequest from '../View/ViewSupportRequest';
import Requests from '../Create/Requests';
import '../../styling/Dropdown.css';
import ViewDataScope from "../View/ViewDataScope";
import AccessAndDisplay from "./AccessAndDisplay";
import {FaRegEdit} from "react-icons/fa";
import EditSupportRequest from "../Edit/EditSupportRequest";

const Employee = ({currentTab}) => {
    const {showDatascope, showAsset, showTask, showMySupport } = AccessAndDisplay()
    // const [viewSupportRequestOpen, setViewSupportRequestOpen] = useState(false); // ISO DISO Employee AM
    // const [viewTaskOpen, setViewTaskOpen] = useState(false); // ISO DS DISO Employee AM

    const ViewDeviceItem = ({ asset }) => {
        const [viewDeviceOpen, setViewDeviceOpen] = useState(false);
        return (
            <li key={asset.id}>
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
    const ViewMySupport = ({ mySupport }) => {
        const [viewSupportRequestOpen, setViewSupportRequestOpen] = useState(false); // ISO DISO Employee AM
        const [editSupportRequestOpen, setEditSupportRequestOpen] = useState(false); // ISO DISO
        return(
            <li key={mySupport.support_id}>
                <p onClick={() => setViewSupportRequestOpen(!viewSupportRequestOpen)}>
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

    const ViewDataScopeItem = ({ datascope }) => {
        const [viewDataScopeOpen, setViewDataScopeOpen] = useState(false);
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
            dataItems.push(<ViewDataScopeItem datascope={datascope} key={datascope.data_scope_id} />)
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
            devices.push(<ViewDeviceItem asset={device} key={device.asset_id} />)
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
        return <Requests userRole="Employee" />;
    }
};

export default Employee;