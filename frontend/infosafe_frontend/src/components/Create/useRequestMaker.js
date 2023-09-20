import { useEffect, useState } from "react";

const useRequestMaker = () => {
    const [user_id, setUserId] = useState('')
    const [reason, setReason] = useState('')
    // Support Requests
    const [support_type, setSupportType] = useState('')
    const [support_description, setSupportDescription] = useState('')
    const [support_status, setSupportStatus] = useState('')
    // Access Requests
    const [ds_id, setDsId] = useState('')
    const [status, setStatus] = useState('')
    // Asset Requests
    const [asset_id, setAssetId] = useState('')
    const [desired_date, setDesiredDate] = useState('')
    const [request_status, setRequestStatus] = useState('')

    const [AvailableDevices, setAvailableDevices] = useState([]);
    const [datascopeData, setDatascopeData] = useState([]);
    const [selectedAssetId, setSelectedAssetId] = useState(null);

    const handleClick = (e, selectedRequest) => {
        e.preventDefault();
        const support = {user_id, support_type, support_description, support_status}
        const access = {user_id, ds_id, reason, status}
        const asset = {user_id, asset_id, reason, desired_date, request_status}
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
                setAssetId(selectedAssetId)
                break;
            case 'Access Request':
                apiUrl = "http://localhost:8080/api/accessrequest/addAr";
                requestBody = access;
                break;
            default:
                return;
        }
        console.log(requestBody);
        fetch(apiUrl, { // write catch
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
        fetch("http://localhost:8080/api/user/getId", {
            method: "GET",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            }
        })
            .then((res) => res.json())
            .then((result) => {
                setUserId(result);
            });
    }, []);

    useEffect(() => {
        fetch('http://localhost:8080/api/datascope/getDs', {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            }
        })
            .then((res) => res.json())
            .then((result) => {
                setDatascopeData(result);
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
        ds_id,
        setDsId,
        status,
        setStatus,
        asset_id,
        setAssetId,
        desired_date,
        setDesiredDate,
        request_status,
        setRequestStatus,
        AvailableDevices,
        setAvailableDevices,
        datascopeData,
        setDatascopeData,
        selectedAssetId,
        setSelectedAssetId
    };
};

export default useRequestMaker;