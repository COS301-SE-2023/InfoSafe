import {useEffect, useState} from "react";

export const useGetSR = () => {
    const [showAllSupport, setShowAllSupport] = useState([]);
    const [showMySupport, setShowMySupport] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:8080/api/supportrequest/getSr', {
            method: "GET",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            }
        })
            .then((res) => {
                if (!res.ok) {
                    console.log("No support request");
                }
                return res.json();
            })
            .then((result) => {
                setShowAllSupport(result);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching showAllSupport:', error);
                setLoading(false);
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
                    console.log("No personal support request");
                }
                return res.json();
            })
            .then((result) => {
                setShowMySupport(result);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching showMySupport:', error);
                setLoading(false);
            })
    }, []);

    return {
        showAllSupport,
        showMySupport,
        loading
    };
};
