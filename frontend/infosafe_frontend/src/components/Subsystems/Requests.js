import React, {useState} from 'react';
import Dropdown from 'react-dropdown';
import '../../styling/Requests.css';
import '../../styling/Dropdown.css';
import useRequestMaker from '../Create/useRequestMaker';
import AccessAndDisplay from "../Roles/AccessAndDisplay";

const SUPPORTOPTIONS = [
    'Laptop Hardware',
    'Microsoft Accounts',
    'Microsoft Applications',
    'Application',
    'Other'
];

const STATUS = ['Open', 'In Progress', 'Resolved', 'Closed'];
const USERS = ['User A', 'User B', 'User C', 'User D'];

const CreateSupportRequest = ({selectedRequest}) => {

    const {
        handleClick,
        // reason,
        setReason,
        setSupportType,
        support_description,
        setSupportDescription,
        setSupportStatus,
        // setDsId,
        // setStatus,
        // setAssetId,
        setDesiredDate,
        // setRequestStatus,
        // AvailableDevices,
        // datascopeData,
        // setAvailableDevices
    } = useRequestMaker();
    const handleDescriptionChange = (e) => {
        setSupportDescription(e.target.value);
    };

    const handleReasonChange = (e) => {
        setReason(e.target.value);
    }
    const handleDateChange = (date) => {
        setDesiredDate(date);
    };
    if (roles.includes("request_support")) {
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
        );
    } else {
        return (null)
    }
}

const CreateAccessRequest = ({selectedRequest}) => {
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
    const handleDescriptionChange = (e) => {
        setSupportDescription(e.target.value);
    };

    const handleReasonChange = (e) => {
        setReason(e.target.value);
    }
    const handleDateChange = (date) => {
        setDesiredDate(date);
    };
    if (roles.includes("request_access")) {
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
                            onChange={(selectedOption) => setDsId(selectedOption.value)}
                        />) : (
                        <p className="loadTitle">Loading...</p>
                    )}
                    <p className="createAccessRequestUserLabel">User</p>
                    <Dropdown
                        className="createAccessRequestUserDropdown"
                        options={USERS}
                        value={USERS[0]}
                        //onChange={(selectedOption) => setRequestStatus(selectedOption.value)}
                    />
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
                            Log Request
                        </button>
                    </div>
                </form>
            </div>
        );
    } else {
        return (null)
    }
};
const CreateAssetRequest = ({selectedRequest}) => {
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
    const handleDescriptionChange = (e) => {
        setSupportDescription(e.target.value);
    };

    const handleReasonChange = (e) => {
        setReason(e.target.value);
    }
    const handleDateChange = (date) => {
        setDesiredDate(date);
    };
    if (roles.includes("request_asset")) {
        return (
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
                            onChange={(selectedOption) => setAvailableDevices(selectedOption.value)}
                        />) : (
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
                    <p className="createAssetRequestDeviceNameLabel">Status</p>
                    <Dropdown
                        className="assetRequestSelectDeviceDropdown"
                        options={STATUS}
                        value={STATUS[0]}
                        onChange={(selectedOption) => setRequestStatus(selectedOption.value)}
                    />
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
        );
    } else {
        return (null)
    }
}


const Requests = ({requestTypes}) => {
    const {roles} = AccessAndDisplay();
    const handleRequestSelect = (requestType) => {
        setSelectedRequest(requestType.value);
    };
    const [selectedRequest, setSelectedRequest] = useState(requestTypes[0]);

    {
        requestTypes.map((requesType, index) => (
            <div key={index}>
            </div>
        ))
    }

    return (
        <div className="display">
            <div className="selectRequestDiv">
                <div className="selectRequest">
                    <p className="selectRequestLabel">SELECT REQUEST CREATION</p>
                    <Dropdown
                        className="selectRequestDropdown"
                        options={requestTypes}
                        value={selectedRequest}
                        onChange={handleRequestSelect}
                    />
                </div>
            </div>
            <div className="requestDiv">
                {selectedRequest === 'Create Support Requests' &&
                    <CreateSupportRequest selectedRequest={selectedRequest}/>}
                {selectedRequest === 'Create Access Requests' &&
                    <CreateAccessRequest selectedRequest={selectedRequest}/>}
                {selectedRequest === 'Create Asset Requests' && <CreateAssetRequest selectedRequest={selectedRequest}/>}
            </div>
        </div>
    );


};

export default Requests;