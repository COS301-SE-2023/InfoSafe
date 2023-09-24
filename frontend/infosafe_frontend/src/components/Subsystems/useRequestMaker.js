import { useEffect, useState } from "react";
import {useCurrentTasks} from "../Charts/useCurrentTasks";
import {useCurrentDataScope} from "../Charts/useCurrentDataScope";

const useRequestMaker = () => {
    const [reason, setReason] = useState('')
    // Support Requests
    const [support_type, setSupportType] = useState('DataScope Support')
    const [support_description, setSupportDescription] = useState('')
    const [support_status, setSupportStatus] = useState('')
    // Access Requests
    const [dataScope_id, setDataScope_id] = useState(null)
    const [status, setStatus] = useState('')
    // Asset Requests
    const [desired_date, setDesiredDate] = useState('')
    const [request_status, setRequestStatus] = useState('')
    const [selectedDevice, setSelectedDevice] = useState("");

    const [user_email, setUserEmail] = useState('');
    const [datascopeData, setDatascopeData] = useState(null);
    const [selectedAssetId, setSelectedAssetId] = useState(null);
    const [availableDevices, setAvailableDevices] = useState([]);
    const [task_id, setTask_id] = useState(null);
    const [asset_id, setAsset_id] = useState(null);
    const {myTasks} = useCurrentTasks();
    const {myAssets} = useCurrentDataScope();
    const handleClick = (e, selectedRequest) => {
        e.preventDefault();
        console.log(selectedDevice)
        let support = {};
        switch(support_type){
            case 'DataScope Support':
                support = {user_email , support_type, dataScope_id , support_description, support_status}
                break;
            case 'Asset Support':
                console.log(asset_id)
                support = {user_email , support_type, asset_id, support_description, support_status}
                break;
            case 'Task Support':
                support = {user_email , support_type, task_id, support_description, support_status}
                break;
            case 'Other':
                support = {user_email , support_type, support_description, support_status}
                break;
        }
        const access = {user_email, dataScope_id, reason, status}
        const asset = {user_email , asset_id: selectedDevice , reason, desired_date, request_status}
        let apiUrl = "";
        let requestBody = {};

        switch (selectedRequest) {
            case 'Support Request':
                apiUrl = "http://localhost:8080/api/supportrequest/addSr";
                requestBody = support;
                break;
            case 'Asset Request':
                apiUrl = "http://localhost:8080/api/assetrequest/addAr";
                requestBody = asset;
                break;
            case 'Access Request':
                apiUrl = "http://localhost:8080/api/accessrequest/addAr";
                requestBody = access;
                break;
            default:
                console.log("this happened")
                return;
        }
        console.log(requestBody);
        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            },
            body: JSON.stringify(requestBody)
        }).then(() => {
            console.log("New request added")
        })
    };

    useEffect(() => {
        fetch('http://localhost:8080/api/asset/getAsset', {
            method: "GET",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            }
        })
            .then((res) => res.json())
            .then((result) => {
                setAvailableDevices(result);
            });
    }, []);

    useEffect(() => {
        fetch('http://localhost:8080/api/datascope/getDs', {
            method: "GET",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            }
        })
            .then((res) => res.json())
            .then((result) => {
                setDatascopeData(result);
            });
    }, []);

    useEffect(() => {
        fetch('http://localhost:8080/api/user/getEmail', {
            method: "GET",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            }
        })
            .then((res) => res.json())
            .then((result) => {
                setUserEmail(result.email);
            });
    }, []);


    return {
        handleClick,
        reason,
        setReason,
        support_type,
        setSupportType,
        support_description,
        setSupportDescription,
        support_status,
        setSupportStatus,
        dataScope_id,
        setDataScope_id,
        status,
        setStatus,
        desired_date,
        setDesiredDate,
        request_status,
        setRequestStatus,
        datascopeData,
        setDatascopeData,
        selectedAssetId,
        setSelectedAssetId,
        setSelectedDevice,
        availableDevices,
        selectedDevice,
        myTasks,
        myAssets,
        setTask_id,
        setAsset_id
    };
};

export default useRequestMaker;