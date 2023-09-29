import {useEffect, useState} from "react";

export const useGetTask = () => {
    const [showTask, setShowTask] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            const response = await fetch('http://ec2-52-91-180-105.compute-1.amazonaws.com:8080/api/task/getTask', {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem('accessToken')
                },
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const result = await response.json();
            setShowTask(result);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // useEffect(() => {
    //     async function getTasks() {
    //         try {
    //             const data = await fetch('http://ec2-52-91-180-105.compute-1.amazonaws.com:8080/api/task/getTask', {
    //                 method: "GET",
    //                 headers: {
    //                     Authorization: "Bearer " + sessionStorage.getItem('accessToken')
    //                 }
    //             })
    //                 .then((res) => res.json())
    //                 .then((result) => {
    //                     setShowTask(result);
    //                     setLoading(false);
    //                 });
    //         } catch (error) {
    //             setError(error);
    //             setLoading(false);
    //         }
    //     }
    //
    //     getTasks();
    // }, []);
    //
    // if (loading) {
    //     return <div>Loading...</div>;
    // }
    //
    // if (error) {
    //     return <div>Error: {error.message}</div>;
    // }

    const fetchAllTasks = () => {
        fetchData();
    };

    return {
        showTask,
        loading,
        fetchAllTasks
    }
}