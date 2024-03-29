import {useEffect, useState} from "react";

export const useGetAsset = () => {
    const [showAsset, setShowAsset] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await fetch('https://infosafe.live/api/asset/getAsset', {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem('accessToken')
                }
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const result = await response.json();
            setShowAsset(result);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const fetchAllAssets = () => {
        fetchData();
    };

    return {
        showAsset,
        loading,
        fetchAllAssets
    }
}