import {useEffect, useState} from "react";

export const useGetSR = () => {
    const [showAllSupport, setShowAllSupport] = useState([]);
    const [showMySupport, setShowMySupport] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:8080/api/supportrequest/getSr', {
            method: "GET",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            }
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then((result) => {
                setIsLoading(false); // Data has been loaded
                setShowAllSupport(result);
            })
            .catch((error) => {
                console.error('Error fetching showAllSupport:', error);
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        fetch('http://localhost:8080/api/supportrequest/getSrById', {
            method: "GET",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            }
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then((result) => {
                setIsLoading(false); // Data has been loaded
                setShowMySupport(result);
            })
            .catch((error) => {
                console.error('Error fetching showMySupport:', error);
                setIsLoading(false);
            })
    }, []);

    return {
        showAllSupport,
        showMySupport,
        isLoading,
    };
};
