import {useState, useEffect} from "react";
import {useGetPerms} from "../getData/getPerms";

export const useCurrentDataScope = () => {
    const [dataScopeCount, setDataScopeCount] = useState(0);
    const [myDataScopeCount, setMyDataScopeCount] = useState('');
    useEffect(() => {
        fetch('http://localhost:8080/api/datascope/getTotal', {
            method: "GET",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            }
        }).then((res) => res.json())
            .then((result) => {
                setDataScopeCount(result);
            });
    }, []);
    useEffect(() => {
        fetch('http://localhost:8080/api/user/dataScopeCount', {
            method: "GET",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            }
        }).then((res) => res.json())
            .then((result) => {
                setMyDataScopeCount(result);
            });
    }, []);

    const [assetCount, setAssetCount] = useState(0);
    const [myAssets, setMyAssets] = useState();
    useEffect(() => {
        fetch('http://localhost:8080/api/user/countDevices', {
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
        dataScopeCount,
        myDataScopeCount,
        assetCount,
        myAssets
    }
}