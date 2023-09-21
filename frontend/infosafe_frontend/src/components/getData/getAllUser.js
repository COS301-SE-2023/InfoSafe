import {useEffect, useState} from "react";

export const useGetAllUser = () => {
    const [showUser, setShowUser] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/user/getAll', {
            method: "GET",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            }
        })
            .then((res) => res.json())
            .then((result) => {
                setShowUser(result);
            });
    }, []);

    return {
        showUser
    }
}