import { useEffect, useState, useReducer } from "react";

export const useGetAllUser = () => {
    const [showUser, setShowUser] = useState([]);
    const [loading, setLoading] = useState(true);
    //const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/user/getAll", {
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
                setLoading(false); // Set loading to false once data is fetched
            } catch (error) {
                // Handle errors here
                console.error("Error fetching data:", error);
                setLoading(false); // Set loading to false in case of an error
            }
        };

        fetchData();
    }, []);

    return {
        showUser,
        loading, // Return a loading state to indicate when the data is being fetched
    };
};
