import {useEffect, useState} from "react";


export const useAssetRequests = () => {
    const [availableAssets, setAvailableAssets] = useState(null);

    useEffect(() => {
        fetch('http://infosafe.live/api/asset/availableAssets', {
            method: "GET",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            }
        })
            .then((res) => res.json())
            .then((result) => {
                setAvailableAssets(result);
            });
    }, []);
    return (
        availableAssets
    )

}

