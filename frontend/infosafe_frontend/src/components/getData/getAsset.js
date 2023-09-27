import {useEffect, useState} from "react";

export const useGetAsset = () => {
    const [showAsset, setShowAsset] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:8080/api/asset/getAsset', {
            method: "GET",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            }
        })
            .then((res) => res.json())
            .then((result) => {
                setShowAsset(result);
                setLoading(false);
            });
    }, []);

    return {
        showAsset,
        loading
    }
}