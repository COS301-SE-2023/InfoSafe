import {useEffect, useState} from "react";

export const useAccessRequests = () => {
    const [datascopeData, setDatascopeData] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/api/datascope/availableDatascopes', {
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
    return(
        datascopeData
    )

}