import React, {useEffect, useState} from 'react';
import Dropdown from 'react-dropdown';
import '../../styling/Requests.css';
import '../../styling/Dropdown.css';
import useRequestMaker from './useRequestMaker';
import Select from "react-select";

export const Requests = () => {
    const SUPPORTOPTIONS = [
        'Laptop Hardware',
        'Microsoft Accounts',
        'Microsoft Applications',
        'Application',
        'Other'
    ];



    const STATUS = ['Open', 'In Progress', 'Resolved', 'Closed'];

    let permittedRequests = [];

    if (true) {
        permittedRequests.push('Support Request');
    }
    if (true) {
        permittedRequests.push('Asset Request');
    }
    if (true) {
        permittedRequests.push('Access Request');
    }

    const handleRequestSelect = (requestType) => {
        console.log(requestType.value)
        setSelectedRequest(requestType.value);
    };

    const [selectedRequest, setSelectedRequest] = useState(SUPPORTOPTIONS[0]);



    const CreateSupportRequest = () => {

        const {
            handleClick,
            setSupportType,
            support_description,
            setSupportDescription,
            setSupportStatus,
        } = useRequestMaker();
        const handleDescriptionChange = (e) => {
            setSupportDescription(e.target.value);
        };
        return (
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
                    <p className="supportRequestStatusLabel">Status</p>
                    <Dropdown
                        className="supportRequestStatusDropdown"
                        options={STATUS}
                        value={STATUS[0]}
                        onChange={(selectedOption) => setSupportStatus(selectedOption.value)}
                    />
                    <div className="createSupportRequestButtonDiv">
                        <button
                            className="createSupportRequestButton"
                            type="submit"
                            onClick={(e) => handleClick(e, selectedRequest)}
                        >Log Support Request
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    const CreateAccessRequest = () => {
        const {
            handleClick,
            reason,
            setReason,
            setDataScope_id,
            setStatus,
            datascopeData
        } = useRequestMaker();

        const handleReasonChange = (e) => {
            setReason(e.target.value);
        }
        return (
            <div className="createAccessRequestDiv">
                <form>
                    <p className="createAccessRequestDataScopeLabel">Data Scope</p>
                    {datascopeData && datascopeData.length > 0 ? (
                        <Dropdown
                            options={datascopeData.map((data) => ({value: data.data_scope_id, label: data.ds_name}))}
                            value={datascopeData.asset_id}
                            className="accessRequestDatascopeDropdown"
                            name="datascopeDropdown"
                            placeholder={"Add DataScope"}
                            onChange={(selectedOption) => setDataScope_id(selectedOption.value)}
                        />) : (
                        <p className="loadTitle">Loading...</p>
                    )}
                    <p className="createAccessRequestReasonLabel">Reason</p>
                    <textarea
                        className="createAccessRequestReasonInput"
                        onChange={handleReasonChange}
                        value={reason}
                    />
                    <p className="createAccessRequestStatusLabel">Status</p>
                    <Dropdown
                        className="accessRequestStatusDropdown"
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
                            Log Access Request
                        </button>
                    </div>
                </form>
            </div>
        );
    };
    const CreateAssetRequest = () => {
        const {
            handleClick,
            reason,
            setReason,
            setDesiredDate,
            setRequestStatus,
            setSelectedDevice,
            selectedDevice,
            availableDevices
        } = useRequestMaker();

        const handleReasonChange = (e) => {
            setReason(e.target.value);
        }
        const handleDateChange = (date) => {
            setDesiredDate(date);
        };
        return (
            <div className="createAssetRequestDiv">
                <form>
                    <p className="createAssetRequestDeviceNameLabel">Device</p>
                    {availableDevices && availableDevices.length > 0 ? (
                        <Dropdown
                            options={availableDevices.map((data) => ({ value: data.asset_id, label: data.asset_name }))}
                            className="assetRequestSelectDeviceDropdown"
                            name="assetRequestSelectDeviceDropdown"
                            placeholder={"Add Device"}
                            value={selectedDevice}
                            onChange={(selectedOption) => setSelectedDevice(selectedOption.value)}
                        />
                    ) : (
                        <p className="loadTitle">Loading...</p>
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
                        className="createAssetRequestDateInput"
                        onChange={(e) => handleDateChange(e.target.value)}
                        required
                    />
                    <p className="createAssetRequestStatusLabel">Status</p>
                    <Dropdown
                        className="assetRequestStatusDropdown"
                        options={STATUS}
                        value={STATUS[0]}
                        onChange={(selectedOption) => setRequestStatus(selectedOption.value)}
                    />
                    <div className="createAssetRequestButtonDiv">
                        <button
                            className="createAssetRequestButton"
                            type="submit"
                            onClick={(e) => handleClick(e, selectedRequest)}>
                            Log Asset Request
                        </button>
                    </div>
                </form>
            </div>
        );
    }

    const RequestType = ({type}) => {
        if (type === "Support Request") {
            return (<CreateSupportRequest></CreateSupportRequest>);
        } else if (type === "Asset Request") {
            return (<CreateAssetRequest></CreateAssetRequest>);
        } else if (type === "Access Request") {
            return (<CreateAccessRequest></CreateAccessRequest>);
        } else {
            return null;
        }
    }

    return (
        <div className="display">
            <div className="requestsBackground">
                <div className="selectRequestDiv">
                    <div className="selectRequest">
                        <div className="requestTypeDiv">
                            {/*<p className="selectRequestLabel">Create request for:</p>*/}
                            <Dropdown
                                className="selectRequestDropdown"
                                options={permittedRequests}
                                value={permittedRequests[0]}
                                onChange={handleRequestSelect}
                            />
                        </div>

                    </div>
                    <div className="requestDiv">
                        <RequestType type={selectedRequest}></RequestType>
                    </div>
                </div>
            </div>

        </div>
    );
}