import {useState, useEffect} from "react";

export const useCurrentTasks = () => {
    const [assetCount, setAssetCount] = useState();
    const [myAssets, setMyAssets] = useState();
    useEffect(() => {
        fetch('http://localhost:8080/api/user/assetCount', {
            method: "GET",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            }
        }).then((res) => res.json())
            .then((result) => {
                setAssetCount(result);
            });
    }, []);
    useEffect(() => {
        fetch('http://localhost:8080/api/user/getAllDevices', {
            method: "GET",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            }
        }).then((res) => res.json())
            .then((result) => {
                setMyAssets(result);
            });
    }, []);
    return {
        assetCount,
        myAssets
    }
}