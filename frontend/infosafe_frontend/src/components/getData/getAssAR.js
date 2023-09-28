import {useEffect, useState} from "react";

export const useGetAssAR = () => {
    const [showAssetRequests, setShowAssetRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await fetch('http://ec2-174-129-77-195.compute-1.amazonaws.com:8080/api/assetrequest/getAr', {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem('accessToken')
                }
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const result = await response.json();
            setShowAssetRequests(result);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const fetchAllAssets = () => {
        fetchData();
    };

    return{
        showAssetRequests,
        loading,
        fetchAllAssets
    }
}