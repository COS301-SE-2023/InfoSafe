import { useEffect, useState } from "react";

export const useAccessRequests = () => {
    const [datascopeData, setDatascopeData] = useState([]);
    const [myDatascopeData, setMyDatascopeData] = useState([]);

    useEffect(() => {
        fetch('https://infosafe.live/api/datascope/availableDatascopes', {
            method: "GET",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
            },
        })
            .then((res) => res.json())
            .then((result) => {
                setDatascopeData(result);
            })
            .catch((error) => {
                console.error("Error fetching availableDatascopes:", error);
            });
    }, []);

    useEffect(() => {
        fetch('https://infosafe.live/api/datascope/getMyDatascopes', {
            method: "GET",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
            },
        })
            .then((res) => res.json())
            .then((result) => {
                setMyDatascopeData(result);
            })
            .catch((error) => {
                console.error("Error fetching getMyDatascopes:", error);
            });
    }, []);

    return {
        myDatascopeData,
        datascopeData,
    };
};
