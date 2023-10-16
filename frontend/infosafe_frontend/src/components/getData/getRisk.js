import {useEffect, useState} from "react";

export const useGetRisk = () => {
    const [showRisk, setShowRisk] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await fetch('https://infosafe.live/api/risk/getRisk', {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem('accessToken')
                }
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const result = await response.json();
            setShowRisk(result);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const fetchAllRisks = () => {
        fetchData();
    };

    return {
        showRisk,
        loading,
        fetchAllRisks
    }
}