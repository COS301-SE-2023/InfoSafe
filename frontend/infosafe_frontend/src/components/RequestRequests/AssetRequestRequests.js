import {useEffect, useState} from "react";


export const useAssetRequests = () => {
    const [availableAssets, setAvailableAssets] = useState(null);

    useEffect(() => {
        fetch('http://ec2-52-91-180-105.compute-1.amazonaws.com:8080/api/asset/availableAssets', {
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

