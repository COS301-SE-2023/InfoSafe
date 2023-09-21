import {useEffect, useState} from "react";

export const useGetAr = () => {
    const [showAccess, setShowAccess] = useState([]);

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
            });
    }, []);

    return {
        showAccess
    };
};