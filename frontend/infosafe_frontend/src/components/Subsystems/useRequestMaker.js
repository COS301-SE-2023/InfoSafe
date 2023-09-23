import { useEffect, useState } from "react";

const useRequestMaker = () => {
    const [reason, setReason] = useState('')
    // Support Requests
    const [support_type, setSupportType] = useState('')
    const [support_description, setSupportDescription] = useState('')
    const [support_status, setSupportStatus] = useState('')
    // Access Requests
    const [dataScope_id, setDataScope_id] = useState(null)
    const [status, setStatus] = useState('')
    // Asset Requests
    const [desired_date, setDesiredDate] = useState('')
    const [request_status, setRequestStatus] = useState('')
    const [selectedDevice, setSelectedDevice] = useState("");

    const[user_email, setUserEmail] = useState('');
    const [datascopeData, setDatascopeData] = useState(null);
    const [selectedAssetId, setSelectedAssetId] = useState(null);
    const[availableDevices, setAvailableDevices] = useState([]);

    const handleClick = (e, selectedRequest) => {
        e.preventDefault();
        console.log(selectedDevice)
        const support = {user_email , support_type, support_description, support_status}
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
        selectedDevice
    };
};

export default useRequestMaker;