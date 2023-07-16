import React, { useState } from 'react';
import Dropdown from 'react-dropdown';
import '../styling/Requests.css';
/* eslint-disable react/prop-types */
/* eslint-disable  no-unused-vars */

const displayISORequests = () => {
    const REQUESTTYPES = ['Support Request', 'Asset Request'];
    const SUPPORTOPTIONS = [
        'Laptop Hardware',
        'Microsoft Accounts',
        'Microsoft Applications',
        'Application',
        'Other'
    ];
    const [selectedRequest, setSelectedRequest] = useState(REQUESTTYPES[0]);
    const handleRequestSelect = (requestType) => {
        setSelectedRequest(requestType.value);
    };
    return (
        <div className="display">
            <div className="selectRequestDiv">
                <div className="selectRequest">
                    <p className="selectRequestLabel">Select Type of Request</p>
                    <Dropdown
                        className="selectRequestDropdown"
                        options={REQUESTTYPES}
                        value={selectedRequest}
                        onChange={handleRequestSelect}
                    />
                </div>
            </div>
            <div className="requestDiv">
                {selectedRequest === 'Support Request' && (
                    <div className="createSupportRequestDiv">
                        <form>
                            <p className="supportRequestTypeLabel">Support Type</p>
                            <Dropdown
                                className="supportRequestTypeDropdown"
                                options={SUPPORTOPTIONS}
                                value={SUPPORTOPTIONS[0]}
                            />
                            <p className="supportRequestDescriptionLabel">Description</p>
                            <textarea className="supportRequestDescription"></textarea>
                            <div className="createSupportRequestButtonDiv">
                                <button
                                    className="createSupportRequestButton"
                                    type="submit"
                                    onClick={() => console.log('Create Support Request')}
                                >
                                    Log Request
                                </button>
                            </div>
                        </form>
                    </div>
                )}
                {selectedRequest === 'Asset Request' && (
                    <div className="createAssetRequestDiv">
                        <form>
                            <p className="createAssetRequestDeviceNameLabel">Device Name</p>
                            <input type="text" className="createAssetRequestDeviceNameInput" />
                            <p className="createAssetRequestUserLabel">User</p>
                            <input type="text" className="createAssetRequestUserInput" />
                            <p className="createAssetRequestReasonLabel">Reason</p>
                            <textarea className="createAssetRequestReasonInput"></textarea>
                            <p className="createAssetRequestDateLabel">Date Required</p>
                            <input type="text" className="createAssetRequestDateInput" />
                            <div className="createAssetRequestButtonDiv">
                                <button
                                    className="createAssetRequestButton"
                                    type="submit"
                                    onClick={() => console.log('Create Asset Request')}
                                >
                                    Log Request
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

const displayDISORequests = () => {
    const SUPPORTOPTIONS = [
        'Laptop Hardware',
        'Microsoft Accounts',
        'Microsoft Applications',
        'Application',
        'Other'
    ];
    return (
        <div className="display">
            <div className="onlySupportRequestDiv">
                <form>
                    <div className="createSupportRequestContentDiv">
                        <p className="createSupportRequestLabel">Create Support Request</p>

                        <p className="createSupportRequestTypeLabel">Support Type</p>
                        <Dropdown
                            className="createSupportRequestTypeDropdown"
                            options={SUPPORTOPTIONS}
                            value={SUPPORTOPTIONS[0]}
                        />
                        <p className="createSupportRequestDescriptionLabel">Description</p>
                        <textarea className="createSupportRequestDescription"></textarea>
                    </div>

                    <div className="supportRequestButtonDiv">
                        <button
                            className="supportRequestButton"
                            type="submit"
                            onClick={() => console.log('Create Support Request')}
                        >
                            Log Request
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const displayAssetManagerRequests = () => {
    const REQUESTTYPES = ['Support Request', 'Asset Request'];

    const SUPPORTOPTIONS = [
        'Laptop Hardware',
        'Microsoft Accounts',
        'Microsoft Applications',
        'Application',
        'Other'
    ];
    const [selectedRequest, setSelectedRequest] = useState(REQUESTTYPES[0]);
    const handleRequestSelect = (requestType) => {
        setSelectedRequest(requestType.value);
    };
    return (
        <div className="display">
            <div className="selectRequestDiv">
                <div className="selectRequest">
                    <p className="selectRequestLabel">Select Type of Request</p>
                    <Dropdown
                        className="selectRequestDropdown"
                        options={REQUESTTYPES}
                        value={selectedRequest}
                        onChange={handleRequestSelect}
                    />
                </div>
            </div>
            <div className="requestDiv">
                {selectedRequest === 'Support Request' && (
                    <div className="createSupportRequestDiv">
                        <form>
                            <p className="supportRequestTypeLabel">Support Type</p>
                            <Dropdown
                                className="supportRequestTypeDropdown"
                                options={SUPPORTOPTIONS}
                                value={SUPPORTOPTIONS[0]}
                            />
                            <p className="supportRequestDescriptionLabel">Description</p>
                            <textarea className="supportRequestDescription"></textarea>
                            <div className="createSupportRequestButtonDiv">
                                <button
                                    className="createSupportRequestButton"
                                    type="submit"
                                    onClick={() => console.log('Create Support Request')}
                                >
                                    Log Request
                                </button>
                            </div>
                        </form>
                    </div>
                )}
                {selectedRequest === 'Asset Request' && (
                    <div className="createAssetRequestDiv">
                        <form>
                            <p className="createAssetRequestDeviceNameLabel">Device Name</p>
                            <input type="text" className="createAssetRequestDeviceNameInput" />
                            <p className="createAssetRequestUserLabel">User</p>
                            <input type="text" className="createAssetRequestUserInput" />
                            <p className="createAssetRequestReasonLabel">Reason</p>
                            <textarea className="createAssetRequestReasonInput"></textarea>
                            <p className="createAssetRequestDateLabel">Date Required</p>
                            <input type="text" className="createAssetRequestDateInput" />
                            <div className="createAssetRequestButtonDiv">
                                <button
                                    className="createAssetRequestButton"
                                    type="submit"
                                    onClick={() => console.log('Create Asset Request')}
                                >
                                    Log Request
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

const displayDataCustodianRequests = () => {
    const REQUESTTYPES = ['Support Request', 'Access Request'];
    const SUPPORTOPTIONS = [
        'Laptop Hardware',
        'Microsoft Accounts',
        'Microsoft Applications',
        'Application',
        'Other'
    ];
    const [selectedRequest, setSelectedRequest] = useState(REQUESTTYPES[0]);
    const handleRequestSelect = (requestType) => {
        setSelectedRequest(requestType.value);
    };
    return (
        <div className="display">
            <div className="selectRequestDiv">
                <div className="selectRequest">
                    <p className="selectRequestLabel">Select Type of Request</p>
                    <Dropdown
                        className="selectRequestDropdown"
                        options={REQUESTTYPES}
                        value={selectedRequest}
                        onChange={handleRequestSelect}
                    />
                </div>
            </div>
            <div className="requestDiv">
                {selectedRequest === 'Support Request' && (
                    <div className="createSupportRequestDiv">
                        <form>
                            <p className="supportRequestTypeLabel">Support Type</p>
                            <Dropdown
                                className="supportRequestTypeDropdown"
                                options={SUPPORTOPTIONS}
                                value={SUPPORTOPTIONS[0]}
                            />
                            <p className="supportRequestDescriptionLabel">Description</p>
                            <textarea className="supportRequestDescription"></textarea>
                            <div className="createSupportRequestButtonDiv">
                                <button
                                    className="createSupportRequestButton"
                                    type="submit"
                                    onClick={() => console.log('Create Support Request')}
                                >
                                    Log Request
                                </button>
                            </div>
                        </form>
                    </div>
                )}
                {selectedRequest === 'Access Request' && (
                    <div className="createAccessRequestDiv">
                        <form>
                            <p className="createAccessRequestDataScopeLabel">Data Scope</p>
                            <input type="text" className="createAccessRequestDataScopeInput" />
                            <p className="createAccessRequestUserLabel">User</p>
                            <input type="text" className="createAccessRequestUserInput" />
                            <p className="createAccessRequestReasonLabel">Reason</p>
                            <textarea className="createAccessRequestReasonInput"></textarea>
                            <div className="createAccessRequestButtonDiv">
                                <button
                                    className="createAccessRequestButton"
                                    type="submit"
                                    onClick={() => console.log('Create Access Request')}
                                >
                                    Log Request
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

const displayEmployeeRequests = () => {
    const SUPPORTOPTIONS = [
        'Laptop Hardware',
        'Microsoft Accounts',
        'Microsoft Applications',
        'Application',
        'Other'
    ];
    return (
        <div className="display">
            <div className="onlySupportRequestDiv">
                <form>
                    <div className="createSupportRequestContentDiv">
                        <p className="createSupportRequestLabel">Create Support Request</p>

                        <p className="createSupportRequestTypeLabel">Support Type</p>
                        <Dropdown
                            className="createSupportRequestTypeDropdown"
                            options={SUPPORTOPTIONS}
                            value={SUPPORTOPTIONS[0]}
                        />
                        <p className="createSupportRequestDescriptionLabel">Description</p>
                        <textarea className="createSupportRequestDescription"></textarea>
                    </div>

                    <div className="supportRequestButtonDiv">
                        <button
                            className="supportRequestButton"
                            type="submit"
                            onClick={() => console.log('Create Support Request')}
                        >
                            Log Request
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
const Requests = ({ userRole }) => {
    // console.log(userRole)
    if (userRole === 'ISO') {
        return <div>{displayISORequests()}</div>;
    }

    if (userRole === 'DISO') {
        return <div>{displayDISORequests()}</div>;
    }

    if (userRole === 'Data Custodian') {
        return <div>{displayDataCustodianRequests()}</div>;
    }

    if (userRole === 'Asset Manager') {
        return <div>{displayAssetManagerRequests()}</div>;
    }

    if (userRole === 'Employee') {
        return <div>{displayEmployeeRequests()}</div>;
    }
};

export default Requests;
