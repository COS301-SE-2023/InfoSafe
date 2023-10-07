import {useEffect, useState} from "react";

export const useGetPerms = () => {
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        fetch('http://infosafe.live/api/role/getPermissions', {
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