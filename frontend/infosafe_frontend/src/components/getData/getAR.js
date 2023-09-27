import {useEffect, useState} from "react";

export const useGetAr = () => {
    const [showAccess, setShowAccess] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:8080/api/accessrequest/getAr', {
            method: "GET",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            }
        })
            .then((res) => res.json())
            .then((result) => {
                setShowAccess(result);
                setLoading(false);
            });
    }, []);

    return {
        showAccess,
        loading
    };
};