import React, {useEffect, useState} from 'react';
import Dropdown from 'react-dropdown';
import '../../styling/Requests.css';
import useRequestMaker from './useRequestMaker';
const DisplayISORequests = () => {
    const REQUESTTYPES = ['Support Request', 'Asset Request'];
    const SUPPORTOPTIONS = [
        'Laptop Hardware',
        'Microsoft Accounts',
        'Microsoft Applications',
        'Application',
        'Other'
    ];
    const {
        handleClick,
        reason,
        setReason,
        setSupportType,
        support_description,
        setSupportDescription,
        setSupportStatus,
        setAssetId,
        setDesiredDate,
        setRequestStatus,
        AvailableDevices,
        setAvailableDevices
        } = useRequestMaker();
    const handleRequestSelect = (requestType) => {
        setSelectedRequest(requestType.value);
    };
    const STATUS = ['Open', 'In Progress', 'Resolved', 'Closed'];
    const [selectedRequest, setSelectedRequest] = useState(REQUESTTYPES[0]);

    const handleDescriptionChange = (e) => {
        setSupportDescription(e.target.value);
    };

    const handleReasonChange = (e) => {
        setReason(e.target.value);
    }
    const handleDateChange = (date) => {
        setDesiredDate(date);
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
                                onChange={(selectedOption) => setSupportType(selectedOption.value)}
                            />
                            <p className="supportRequestDescriptionLabel">Description</p>
                            <textarea
                                className="supportRequestDescription"
                                onChange={handleDescriptionChange}
                                value={support_description}/>
                            <p className="supportRequestTypeLabel">Status</p>
                            <Dropdown
                                className="supportRequestTypeDropdown"
                                options={STATUS}
                                value={STATUS[0]}
                                onChange={(selectedOption) => setSupportStatus(selectedOption.value)}
                            />
                            <div className="createSupportRequestButtonDiv">
                                <button
                                    className="createSupportRequestButton"
                                    type="submit"
                                    onClick={(e) => handleClick(e, selectedRequest)}
                                >Log Request
                                </button>
                            </div>
                        </form>
                    </div>
                )}
                {selectedRequest === 'Asset Request' && (
                    <div className="createAssetRequestDiv">
                        <form>
                            <p className="createAssetRequestDeviceNameLabel">Device</p>
                            {AvailableDevices && AvailableDevices.length > 0 ? (
                                <Dropdown
                                    options={AvailableDevices.map((data) => ({value: data.asset_id, label: data.asset_name}))}
                                    value={AvailableDevices.asset_name}
                                    className="assetRequestSelectDeviceDropdown"
                                    name="assetRequestSelectDeviceDropdown"
                                    placeholder={"Add Device"}
                                    onChange={(selectedOption)=> setAvailableDevices(selectedOption.value)}
                                /> ) : (
                                <p>Loading...</p>
                            )}
                            <p className="createAssetRequestReasonLabel">Reason</p>
                            <textarea
                                className="createAssetRequestReasonInput"
                                onChange={handleReasonChange}
                                value={reason}
                            />
                            <p className="createAssetRequestDateLabel">Desired Date</p>
                            <input
                                type="date"
                                className="createAssetRequestDateLabel"
                                onChange={(e) => handleDateChange(e.target.value)}
                                required
                            />
                            <p className="createAssetRequestDeviceNameLabel">Status</p>
                            <Dropdown
                                className="assetRequestSelectDeviceDropdown"
                                options={STATUS}
                                value={STATUS[0]}
                                onChange={(selectedOption) => setRequestStatus(selectedOption.value)}
                            />
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

const DisplayDataCustodianRequests = () => {
    const REQUESTTYPES = ['Support Request', 'Access Request', 'Asset Request'];
    const SUPPORTOPTIONS = [
        'Laptop Hardware',
        'Microsoft Accounts',
        'Microsoft Applications',
        'Application',
        'Other'
    ];
    const STATUS = ['Open', 'In Progress', 'Resolved', 'Closed'];
    const [selectedRequest, setSelectedRequest] = useState(REQUESTTYPES[0]);
    const {
        handleClick,
        reason,
        setReason,
        setSupportType,
        support_description,
        setSupportDescription,
        setSupportStatus,
        setDsId,
        setStatus,
        setAssetId,
        setDesiredDate,
        setRequestStatus,
        AvailableDevices,
        datascopeData,
        setAvailableDevices
        } = useRequestMaker();
    const handleRequestSelect = (requestType) => {
        setSelectedRequest(requestType.value);
    };
    const handleDescriptionChange = (e) => {
        setSupportDescription(e.target.value);
    };

    const handleReasonChange = (e) => {
        setReason(e.target.value);
    }
    const handleDateChange = (date) => {
        console.log(date)
        setDesiredDate(date);
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
                                onChange={(selectedOption) => setSupportType(selectedOption.value)}
                            />
                            <p className="supportRequestDescriptionLabel">Description</p>
                            <textarea
                                className="supportRequestDescription"
                                onChange={handleDescriptionChange}
                                value={support_description}/>
                            <p className="supportRequestTypeLabel">Status</p>
                            <Dropdown
                                className="supportRequestTypeDropdown"
                                options={STATUS}
                                value={STATUS[0]}
                                onChange={(selectedOption) => setSupportStatus(selectedOption.value)}
                            />
                            <div className="createSupportRequestButtonDiv">
                                <button
                                    className="createSupportRequestButton"
                                    type="submit"
                                    onClick={(e) => handleClick(e, selectedRequest)}
                                >Log Request
                                </button>
                            </div>
                        </form>
                    </div>
                )}
                {selectedRequest === 'Access Request' && (
                    <div className="createAccessRequestDiv">
                        <form>
                            <p className="createAccessRequestDataScopeLabel">Data Scope</p>
                            {datascopeData && datascopeData.length > 0 ? (
                                <Dropdown
                                    options={datascopeData.map((data) => ({value: data.data_scope_id, label: data.ds_name}))}
                                    value={datascopeData.asset_id}
                                    className="datascopeDropdown"
                                    name="datascopeDropdown"
                                    placeholder={"Add DataScope"}
                                    onChange={(selectedOption)=> setDsId(selectedOption.value)}
                                /> ) : (
                                <p>Loading...</p>
                            )}
                            <p className="createAccessRequestReasonLabel">Reason</p>
                            <textarea
                                className="createAccessRequestReasonInput"
                                onChange={handleReasonChange}
                                value={reason}
                            />
                            <p className="createAccessRequestDeviceNameLabel">Status</p>
                            <Dropdown
                                className="assetAccessSelectDeviceDropdown"
                                options={STATUS}
                                value={STATUS[0]}
                                onChange={(selectedOption) => setStatus(selectedOption.value)}
                            />
                            <div className="createAccessRequestButtonDiv">
                                <button
                                    className="createAccessRequestButton"
                                    type="submit"
                                    onClick={(e) => handleClick(e, selectedRequest)}
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
                            <p className="createAssetRequestDeviceNameLabel">Device</p>
                            {AvailableDevices && AvailableDevices.length > 0 ? (
                                <Dropdown
                                    options={AvailableDevices.map((data) => ({value: data.asset_id, label: data.asset_name}))}
                                    value={AvailableDevices.asset_name}
                                    className="assetRequestSelectDeviceDropdown"
                                    name="assetRequestSelectDeviceDropdown"
                                    placeholder={"Add Device"}
                                    onChange={(selectedOption)=> setAvailableDevices(selectedOption.value)}
                                /> ) : (
                                <p>Loading...</p>
                            )}
                            <p className="createAssetRequestReasonLabel">Reason</p>
                            <textarea
                                className="createAssetRequestReasonInput"
                                onChange={handleReasonChange}
                                value={reason}
                            />
                            <p className="createAssetRequestDateLabel">Desired Date</p>
                            <input
                                type="date"
                                className="createAssetRequestDateLabel"
                                onChange={(e) => handleDateChange(e.target.value)}
                                required
                            />
                            <p className="createAssetRequestDeviceNameLabel">Status</p>
                            <Dropdown
                                className="assetRequestSelectDeviceDropdown"
                                options={STATUS}
                                value={STATUS[0]}
                                onChange={(selectedOption) => setRequestStatus(selectedOption.value)}
                            />
                            <input type="text" className="createAssetRequestDateInput" />
                            <div className="createAssetRequestButtonDiv">
                                <button
                                    className="createAssetRequestButton"
                                    type="submit"
                                    onClick={(e) => handleClick(e, selectedRequest)}
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

const Requests = ({ userRole }) => {
    // console.log(userRole)
    if (userRole === 'ISO' || userRole === 'DISO' || userRole === 'Asset Manager' || userRole === 'System Administrator' || userRole === 'Employee') {
        return <div>{DisplayISORequests()}</div>;
    }

    else if (userRole === 'Data Custodian') {
        return <div>{DisplayDataCustodianRequests()}</div>;
    }
};

export default Requests;
