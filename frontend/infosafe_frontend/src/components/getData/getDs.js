import {useEffect, useState} from "react";

export const  useGetDS = () => {
    const [showDatascope, setShowDatascope] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8080/api/datascope/getDs', {
            method: "GET",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            }
        })
            .then((res) => res.json())
            .then((result) => {
                setShowDatascope(result);
            });
    }, []);
    return {
        showDatascope
    }
}