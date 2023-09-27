import {useEffect, useState} from "react";

export const  useGetDS = () => {
    const [showDatascope, setShowDatascope] = useState([]);
    const [myDatascopes, setMyDatascopes] = useState([]);
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        fetch('http://localhost:8080/api/datascope/getMyDatascopes', {
            method: "GET",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            }
        })
            .then((res) => res.json())
            .then((result) => {
                setMyDatascopes(result);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching DataScopes:", error);
                setLoading(false);
            });
    }, []);
    return {
        showDatascope,
        myDatascopes,
        loading
    }
}