import {useEffect, useState} from "react";

export const  useGetDS = () => {
    const [showDatascope, setShowDatascope] = useState([]);
    const [myDatascopes, setMyDatascopes] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAllData = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/datascope/getDs', {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem('accessToken')
                }
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const result = await response.json();
            setShowDatascope(result);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const fetchMyData = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/datascope/getMyDatascopes', {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem('accessToken')
                }
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const result = await response.json();
            setMyDatascopes(result);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const fetchAllDatascopes = () => {
        fetchAllData();
    };

    const fetchMyDatascopes = () => {
        fetchMyData();
    };

    return {
        showDatascope,
        myDatascopes,
        loading,
        fetchAllDatascopes,
        fetchMyDatascopes
    }
}