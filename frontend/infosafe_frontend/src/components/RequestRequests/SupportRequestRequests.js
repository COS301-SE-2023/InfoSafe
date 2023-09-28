import {useEffect, useState} from "react";


export const useSupportRequests = () => {
    const [myDataScopes, setMyDataScopes] = useState([]);

    useEffect(() => {
        fetch('https://ec2-174-129-77-195.compute-1.amazonaws.com:8080/api/datascope/getMyDatascopes', {
            method: "GET",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            }
        })
            .then((res) => res.json())
            .then((result) => {
                setMyDataScopes(result);
            })
            .catch((error) => {
                console.error("Error fetching DataScopes:", error);
            });
    }, []);

    //console.log(myDataScopes)
    return (
        myDataScopes)
}
