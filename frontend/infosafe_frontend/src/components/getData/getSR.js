import {useEffect, useState} from "react";

export const useGetSR = () => {
    const [showAllSupport, setShowAllSupport] = useState([]);
    const [showMySupport, setShowMySupport] = useState([]);

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
            })
            .catch((error) => {
                console.error('Error fetching showAllSupport:', error);
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
            })
            .catch((error) => {
                console.error('Error fetching showMySupport:', error);

            })
    }, []);

    return {
        showAllSupport,
        showMySupport,
    };
};
