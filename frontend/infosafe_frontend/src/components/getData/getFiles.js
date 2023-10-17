import {useState} from "react";

export const useGetFiles = () => {
    const [showFile, setShowFile] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/storage/list', {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem('accessToken')
                }
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const result = await response.json();
            setShowFile(result);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const fetchAllFiles = () => {
        fetchData();
    };

    return {
        showFile,
        loading,
        fetchAllFiles
    }
}