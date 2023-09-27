import {useEffect, useState} from "react";

export const useGetAssAR = () => {
    const [showAssetRequests, setShowAssetRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:8080/api/assetrequest/getAr', {
            method: "GET",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            }
        })
            .then((res) => res.json())
            .then((result) => {
                setShowAssetRequests(result);
                setLoading(false);
            });
    }, []);

    return{
        showAssetRequests,
        loading
    }
}