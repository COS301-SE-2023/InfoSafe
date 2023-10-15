import { useState, useEffect } from "react";
import { useGetPerms } from "../getData/getPerms";

export const useCurrentDataScope = () => {
    const [dataScopeCount, setDataScopeCount] = useState(0);
    const [myDataScopeCount, setMyDataScopeCount] = useState(0);

    useEffect(() => {
        fetch('https://infosafe.live/api/datascope/getTotal', {
            method: "GET",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken'),
            },
        })
            .then((res) => res.json())
            .then((result) => {
                setDataScopeCount(result);
            })
            .catch((error) => {
                console.error("Error fetching DataScope count:", error);
            });
    }, []);

    useEffect(() => {
        fetch('https://infosafe.live/api/user/dataScopeCount', {
            method: "GET",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken'),
            },
        })
            .then((res) => res.json())
            .then((result) => {
                setMyDataScopeCount(result);
            })
            .catch((error) => {
                console.error("Error fetching MyDataScope count:", error);
            });
    }, []);

    const [assetCount, setAssetCount] = useState(0);
    const [myAssets, setMyAssets] = useState([]);

    useEffect(() => {
        fetch('https://infosafe.live/api/user/countDevices', {
            method: "GET",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken'),
            },
        })
            .then((res) => res.json())
            .then((result) => {
                setAssetCount(result);
            })
            .catch((error) => {
                console.error("Error fetching asset count:", error);
            });
    }, []);

    useEffect(() => {
        fetch('https://infosafe.live/api/user/getAllDevices', {
            method: "GET",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken'),
            },
        })
            .then((res) => res.json())
            .then((result) => {
                setMyAssets(result);
            })
            .catch((error) => {
                console.error("Error fetching MyAssets:", error);
            });
    }, []);

    const [totalAssets, setTotalAssets] = useState(0);

    useEffect(() => {
        fetch('https://infosafe.live/api/asset/getTotalAssets', {
            method: "GET",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken'),
            },
        })
            .then((res) => res.json())
            .then((result) => {
                setTotalAssets(result);
            })
            .catch((error) => {
                console.error("Error fetching total assets:", error);
            });
    }, []);

    return {
        dataScopeCount,
        myDataScopeCount,
        assetCount,
        myAssets,
        totalAssets,
    };
};
