import {useEffect, useState} from "react";

export const useGetAr = () => {
    const [showAccess, setShowAccess] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/accessrequest/getAr', {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem('accessToken')
                }
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const result = await response.json();
                setShowAccess(result);
                setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const fetchAllAr = () => {
        fetchData();
    };

    return {
        showAccess,
        loading,
        fetchAllAr
    };
};