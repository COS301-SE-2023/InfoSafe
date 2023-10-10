import { useEffect, useState } from "react";

export const useGetPerms = () => {
    const [roles, setRoles] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/api/role/getPermissions', {
            method: "GET",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            }
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
                return res.json();
            })
            .then((result) => {
                setRoles(result);
            })
            .catch((error) => {
                setError(error);
            });
    }, []);

    return {
        roles,
        error
    };
};
