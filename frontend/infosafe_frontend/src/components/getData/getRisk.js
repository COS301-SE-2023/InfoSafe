import {useEffect, useState} from "react";

export const useGetRisk = () => {
    const [showRisk, setShowRisk] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/risk/getRisk', {
            method: "GET",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            }
        })
            .then((res) => res.json())
            .then((result) => {
                setShowRisk(result);
            });
    }, []);

    return {
        showRisk
    }
}