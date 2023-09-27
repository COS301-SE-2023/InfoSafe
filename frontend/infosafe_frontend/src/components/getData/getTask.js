import {useEffect, useState} from "react";

export const useGetTask = () => {
    const [showTask, setShowTask] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/api/task/getTask', {
            method: "GET",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            }
        })
            .then((res) => res.json())
            .then((result) => {
                setShowTask(result);
                setLoading(false);
            });
    }, []);

    // useEffect(() => {
    //     async function getTasks() {
    //         try {
    //             const data = await fetch('http://localhost:8080/api/task/getTask', {
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

    return {
        showTask,
        loading
    }
}