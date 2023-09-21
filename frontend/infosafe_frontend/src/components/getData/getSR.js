
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
            .then((res) => res.json())
            .then((result) => {
                setShowAllSupport(result);
            });
    }, []);

    useEffect(() => {
        fetch('http://localhost:8080/api/user/getId', {
            method: "GET",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            }
        })
            .then((res) => res.json())
            .then((result) => {
                const id = result;
                fetch('http://localhost:8080/api/supportrequest/getSrById/' + id, {
                    method: "GET",
                    headers: {
                        Authorization: "Bearer " + sessionStorage.getItem('accessToken')
                    }
                })
                    .then((res) => res.json())
                    .then((result) => {
                        setShowMySupport(result);
                    });
            });
    }, []);

    return {
        showAllSupport,
        showMySupport
    }
}