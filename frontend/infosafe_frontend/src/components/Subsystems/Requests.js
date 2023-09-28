import React, {useEffect, useState} from 'react';
import Dropdown from 'react-dropdown';
import '../../styling/Requests.css';
import '../../styling/Dropdown.css';
import useRequestMaker from './useRequestMaker';
import Select from "react-select";
import {useCurrentDataScope} from "../Charts/useCurrentDataScope";
import {useCurrentTasks} from "../Charts/useCurrentTasks";
import {useAccessRequests} from "../RequestRequests/AccessRequestRequests";
import {useAssetRequests} from "../RequestRequests/AssetRequestRequests";
import {useSupportRequests} from "../RequestRequests/SupportRequestRequests";
import request_help from "../../images/request_help.png";
import {HelpPopup} from "../HelpPopup";
import {IoHelpCircle} from 'react-icons/io5';
export const Requests = () => {
    const SUPPORTOPTIONS = ['DataScope Support', 'Asset Support', 'Task Support', 'Other'];


    // const STATUS = ['Open', 'In Progress', 'Resolved', 'Closed'];
    const requestOptions = ["Support Request", "Asset Request", "Access Request"];
    let permittedRequests = [];

    if (true) {
        permittedRequests.push(requestOptions[0]);
    }
    if (true) {
        permittedRequests.push(requestOptions[1]);
    }
    if (true) {
        permittedRequests.push(requestOptions[2]);
    }

    const handleRequestSelect = (requestType) => {
        setSelectedRequest(requestType.value);
    };

    const [selectedRequest, setSelectedRequest] = useState(requestOptions[0]);

    const CreateSupportRequest = () => {
        const {
            handleClick, support_type,setSupportType, support_description, setSupportDescription, setDataScope_id, setTask_id, setAsset_id
        } = useRequestMaker();
        const {myAssets} = useCurrentDataScope();
        const {myTasks} = useCurrentTasks();
        const [myDataScopes, setMyDataScopes] = useState([]);

        useEffect(() => {
            fetch('http://ec2-174-129-77-195.compute-1.amazonaws.com:8080/api/datascope/getMyDatascopes', {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem('accessToken')
                }
            })
                .then((res) => res.json())
                .then((result) => {
                    setMyDataScopes(result);
                })
                .catch((error) => {
                    console.error("Error fetching DataScopes:", error);
                });
        }, []);
        const handleDescriptionChange = (e) => {
            setSupportDescription(e.target.value);
        };
        return (<div className="createSupportRequestDiv">
            <form>
                <p className="supportRequestTypeLabel">Support Type</p>
                <Dropdown
                    className="supportRequestTypeDropdown"
                    options={SUPPORTOPTIONS}
                    value={SUPPORTOPTIONS[0]}
                    onChange={(selectedOption) => setSupportType(selectedOption.value)}
                />
                {support_type === ('DataScope Support') && (
                    <div>
                        <p className="createAccessRequestDataScopeLabel">Data Scope</p>
                        {myDataScopes && myDataScopes.length > 0 ? (
                            <Dropdown
                                options={myDataScopes.map((data) => ({ value: data.data_scope_id, label: data.ds_name }))}
                                value={myDataScopes.data_scope_id}
                                className="accessRequestDatascopeDropdown"
                                name="datascopeDropdown"
                                placeholder={"Add DataScope"}
                                onChange={(selectedOption) => setDataScope_id(selectedOption.value)}
                            />
                        ) : (
                            <p className="loadTitle">Loading...</p>
                        )}
                    </div>
                )}
                {support_type === ('Task Support') && (
                    <div>
                        <p className="createAccessRequestDataScopeLabel">Tasks</p>
                        {myTasks && myTasks.length > 0 ? (
                            <Dropdown
                                options={myTasks.map((data) => ({ value: data.task_id, label: data.task_name }))}
                                value={myTasks.data_scope_id}
                                className="accessRequestDatascopeDropdown"
                                name="datascopeDropdown"
                                placeholder={"Add Task"}
                                onChange={(selectedOption) => setTask_id(selectedOption.value)}
                            />
                        ) : (
                            <p className="loadTitle">Loading...</p>
                        )}
                    </div>
                )}
                {support_type === ('Asset Support') && (
                    <div>
                        <p className="createAccessRequestDataScopeLabel">Devices</p>
                        {myAssets && myAssets.length > 0 ? (
                            <Dropdown
                                options={myAssets.map((data) => ({ value: data.asset_id, label: data.asset_name }))}
                                value={myAssets.asset_id}
                                className="accessRequestDatascopeDropdown"
                                name="datascopeDropdown"
                                placeholder={"Add Asset"}
                                onChange={(selectedOption) => setAsset_id(selectedOption.value)}
                            />
                        ) : (
                            <p className="loadTitle">Loading...</p>
                        )}
                    </div>
                )}
                <p className="supportRequestDescriptionLabel">Description</p>
            <textarea
                className="supportRequestDescription"
                onChange={handleDescriptionChange}
                value={support_description}/>
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
    )
        ;
    }

    const CreateAccessRequest = () => {
        const { handleClick, reason, setReason, setDataScope_id } = useRequestMaker();
        const {datascopeData} = useAccessRequests(); // Rename datascopeData to accessRequests
        const handleReasonChange = (e) => {
            setReason(e.target.value);
        }

        return (
            <div className="createAccessRequestDiv">
                <form>
                    <p className="createAccessRequestDataScopeLabel">Data Scope</p>
                    {datascopeData ? (
                        datascopeData.length > 0 ? (
                            <Dropdown
                                options={datascopeData.map((data) => ({ value: data.data_scope_id, label: data.ds_name }))}
                                value={datascopeData[0].ds_name}
                                className="accessRequestDatascopeDropdown"
                                name="datascopeDropdown"
                                placeholder={"Add DataScope"}
                                onChange={(selectedOption) => setDataScope_id(selectedOption.value)}
                            />
                        ) : (
                            <p className="loadTitle">No available DataScopes</p>
                        )
                    ) : (
                        <p className="loadTitle">Loading...</p>
                    )}
                    <p className="createAccessRequestReasonLabel">Reason</p>
                    <textarea
                        className="createAccessRequestReasonInput"
                        onChange={handleReasonChange}
                        value={reason}
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
            setSelectedDevice,
            selectedDevice
        } = useRequestMaker();

        const availableAssets = useAssetRequests();

        const handleReasonChange = (e) => {
            setReason(e.target.value);
        }
        const handleDateChange = (date) => {
            setDesiredDate(date);
        };
        return (<div className="createAssetRequestDiv">
            <form>
                <p className="createAssetRequestDeviceNameLabel">Device</p>
                {availableAssets && availableAssets.length > 0 ? (<Dropdown
                    options={availableAssets.map((data) => ({value: data.asset_id, label: data.asset_name}))}
                    className="assetRequestSelectDeviceDropdown"
                    name="assetRequestSelectDeviceDropdown"
                    placeholder={"Add Device"}
                    value={selectedDevice[0]}
                    onChange={(selectedOption) => setSelectedDevice(selectedOption.value)}
                />) : (<p className="loadTitle">Loading...</p>)}
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
                <div className="createAssetRequestButtonDiv">
                    <button
                        className="createAssetRequestButton"
                        type="submit"
                        onClick={(e) => handleClick(e, selectedRequest)}>
                        Log Asset Request
                    </button>
                </div>
            </form>
        </div>);
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
    const [helpOpen, setHelpOpen] = useState(false);

    return (<div className="display">
        <div className="requestsBackground">
            <button  className="requestsHelpButton" onClick={() => setHelpOpen(true)}>
                <IoHelpCircle className="helpPopupIcon"></IoHelpCircle>
                {helpOpen ? (
                    <HelpPopup
                        popupClose={() => setHelpOpen(false)}
                        popupOpen={helpOpen}
                        image={request_help}
                    />
                ) : null}
            </button>
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
    </div>);
}