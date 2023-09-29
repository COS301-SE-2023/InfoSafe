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
    // Asset Requests
    const [desired_date, setDesiredDate] = useState('')
    const [selectedDevice, setSelectedDevice] = useState("");

    const [user_email, setUserEmail] = useState('');
    const [selectedAssetId, setSelectedAssetId] = useState(null);
    const [availableDevices, setAvailableDevices] = useState([]);
    const [task_id, setTask_id] = useState(null);
    const [asset_id, setAsset_id] = useState(null);


    const [availableDatascopeData, setAvailableDatascopeData] = useState(null);
    const [availableDataScope_id, setAvailableDataScope_id] = useState(null)

    const handleClick = (e, selectedRequest) => {
        e.preventDefault();
        //console.log(selectedDevice)
        let support = {};
        switch(support_type){
            case 'DataScope Support':
                support = {user_email , support_type, dataScope_id , support_description, support_status: "Open"}
                break;
            case 'Asset Support':
                //console.log(asset_id)
                support = {user_email , support_type, asset_id, support_description, support_status: "Open"}
                break;
            case 'Task Support':
                support = {user_email , support_type, task_id, support_description, support_status: "Open"}
                break;
            case 'Other':
                support = {user_email , support_type, support_description, support_status: "Open"}
                break;
        }
        const access = {user_email, dataScope_id, reason, status: "Open"}
        const asset = {user_email , asset_id: selectedDevice , reason, desired_date, request_status: "Open"}
        let apiUrl = "";
        let requestBody = {};

        switch (selectedRequest) {
            case 'Support Request':
                apiUrl = "http://ec2-52-91-180-105.compute-1.amazonaws.com:8080/api/supportrequest/addSr";
                requestBody = support;
                break;
            case 'Asset Request':
                apiUrl = "http://ec2-52-91-180-105.compute-1.amazonaws.com:8080/api/assetrequest/addAr";
                requestBody = asset;
                break;
            case 'Access Request':
                apiUrl = "http://ec2-52-91-180-105.compute-1.amazonaws.com:8080/api/accessrequest/addAr";
                requestBody = access;
                break;
            default:
                //console.log("this happened")
                return;
        }
        //console.log(requestBody);
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
        fetch('http://ec2-52-91-180-105.compute-1.amazonaws.com:8080/api/user/getEmail', {
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
        desired_date,
        setDesiredDate,
        selectedAssetId,
        setSelectedAssetId,
        setSelectedDevice,
        availableDevices,
        selectedDevice,
        setTask_id,
        setAsset_id,
        availableDatascopeData,
        setAvailableDataScope_id,
    };
};

export default useRequestMaker;