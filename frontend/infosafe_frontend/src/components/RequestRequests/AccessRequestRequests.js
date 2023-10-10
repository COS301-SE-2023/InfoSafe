import { useEffect, useState } from "react";

export const useAccessRequests = () => {
    const [datascopeData, setDatascopeData] = useState([]);
    const [myDatascopeData, setMyDatascopeData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/datascope/availableDatascopes', {
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
        fetch('http://localhost:8080/api/datascope/getMyDatascopes', {
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
