import {useEffect, useState} from "react";

export const useGetSR = () => {
    const [showAllSupport, setShowAllSupport] = useState([]);
    const [showMySupport, setShowMySupport] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAllData = async () => {
        try {
            const response = await fetch('http://infosafe.live/api/supportrequest/getSr', {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem('accessToken')
                }
            })
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
                const result = await response.json();
                setShowAllSupport(result);
                setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const fetchAllSupport = () => {
        fetchAllData();
    };

    const fetchMyData = async () => {
        try {
            const response = await fetch('http://infosafe.live/api/supportrequest/getSrById', {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem('accessToken')
                }
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const result = await response.json();
                setShowMySupport(result);
                setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const fetchMySupport = () => {
        fetchMyData();
    };

    return {
        showAllSupport,
        showMySupport,
        loading,
        fetchMySupport,
        fetchAllSupport
    };
};
