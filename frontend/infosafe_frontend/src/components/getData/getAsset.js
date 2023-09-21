import {useEffect, useState} from "react";

export const useGetAsset = () => {
    const [showAsset, setShowAsset] = useState([]);
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
            });
    }, []);

    return {
        showAsset
    }
}