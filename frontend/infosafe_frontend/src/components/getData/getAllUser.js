import { useEffect, useState } from "react";

export const useGetAllUser = () => {
    const [showUser, setShowUser] = useState([]);
    const [loading, setLoading] = useState(true);
        const fetchData = async () => {
                try {
                    const response = await fetch("http://ec2-174-129-77-195.compute-1.amazonaws.com:8080/api/user/getAll", {
                        method: "GET",
                        headers: {
                            Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
                        },
                    });
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    const result = await response.json();
                    setShowUser(result);
                    setLoading(false);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
        };
    const fetchAllUsers = () => {
        fetchData();
    };
    return {
        showUser,
        loading,
        fetchAllUsers
    };
};



