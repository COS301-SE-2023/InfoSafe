import { useEffect, useState } from "react";

export const useAssetRequests = () => {
    const [availableAssets, setAvailableAssets] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/api/asset/availableAssets', {
            method: "GET",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken'),
            },
        })
            .then((res) => res.json())
            .then((result) => {
                setAvailableAssets(result);
            })
            .catch((error) => {
                console.error("Error fetching availableAssets:", error);
            });
    }, []);

    return availableAssets;
};
