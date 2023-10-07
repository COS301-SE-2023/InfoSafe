import {useEffect, useState} from "react";

export const useAccessRequests = () => {
    const [datascopeData, setDatascopeData] = useState([]);
    const [myDatascopeData, setMyDatascopeData] = useState([]);

    useEffect(() => {
        fetch('http://infosafe.live/api/datascope/availableDatascopes', {
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
        fetch('http://infosafe.live/api/datascope/getMyDatascopes', {
            method: "GET",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            }
        })
            .then((res) => res.json())
            .then((result) => {
                setMyDatascopeData(result);
            });
    }, []);
    return {
        myDatascopeData,
        datascopeData
    }

}