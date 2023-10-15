import { useState, useEffect } from "react";

export const useCurrentTasks = () => {
    const [taskCount, setTaskCount] = useState(0);
    const [myTasks, setMyTasks] = useState([]);
    const [totalTasks, setTotalTasks] = useState(0);

    useEffect(() => {
        fetch('http://localhost:8080/api/user/taskCount', {
            method: "GET",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken'),
            },
        })
            .then((res) => res.json())
            .then((result) => {
                setTaskCount(result);
            })
            .catch((error) => {
                console.error("Error fetching task count:", error);
            });
    }, []);

    useEffect(() => {
        fetch('http://localhost:8080/api/user/getAllTasks', {
            method: "GET",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken'),
            },
        })
            .then((res) => res.json())
            .then((result) => {
                setMyTasks(result);
            })
            .catch((error) => {
                console.error("Error fetching MyTasks:", error);
            });
    }, []);

    useEffect(() => {
        fetch('http://localhost:8080/api/task/totalTasks', {
            method: "GET",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken'),
            },
        })
            .then((res) => res.json())
            .then((result) => {
                setTotalTasks(result);
            })
            .catch((error) => {
                console.error("Error fetching total tasks:", error);
            });
    }, []);

    return {
        taskCount,
        myTasks,
        totalTasks,
    };
};
