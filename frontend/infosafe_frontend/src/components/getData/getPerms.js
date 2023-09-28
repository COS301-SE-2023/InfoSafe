import {useEffect, useState} from "react";

export const useGetPerms = () => {
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        fetch('http://ec2-174-129-77-195.compute-1.amazonaws.com:8080/api/role/getPermissions', {
            method: "GET",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            }
        })
            .then((res) => res.json())
            .then((result) => {
                setRoles(result);
            });
    }, []);

    return {
        roles
    }
}