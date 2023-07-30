import '../../styling/Employee.css';
import React, { useEffect, useState } from 'react';
import {ViewTask} from '../View/ViewTaskPopup';
import {ViewDevice} from '../View/ViewDevice';
import ViewSupportRequest from '../View/ViewSupportRequest';
import Requests from '../Requests';
import '../../styling/Dropdown.css';
import ViewDataScope from "../View/ViewDataScope";
import AccessAndDisplay from "./AccessAndDisplay";
/* eslint-disable react/prop-types */

const Employee = ({currentTab}) => {
    const {showDatascope, setShowDatascope, showAsset, setShowAsset} = AccessAndDisplay()
    const [viewSupportRequestOpen, setViewSupportRequestOpen] = useState(false); // ISO DISO Employee AM
    const [viewTaskOpen, setViewTaskOpen] = useState(false); // ISO DS DISO Employee AM

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

    const ViewDataScopeItem = ({ datascope }) => {
        const [viewDataScopeOpen, setViewDataScopeOpen] = useState(false);
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

    if (currentTab === 7)
    {
        return <Requests userRole="Employee" />;
    }
};

export default Employee;