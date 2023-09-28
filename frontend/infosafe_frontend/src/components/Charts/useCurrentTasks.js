import {useState, useEffect} from "react";

export const useCurrentTasks = () => {
    const [taskCount, setTaskCount] = useState(0);
    const [myTasks, setMyTasks] = useState([]);
    const [totalTasks, setTotalTasks] = useState(0);
    useEffect(() => {
        fetch('https://ec2-174-129-77-195.compute-1.amazonaws.com:8080/api/user/taskCount', {
            method: "GET",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            }
        }).then((res) => res.json())
            .then((result) => {
                setTaskCount(result);
            });
    }, []);
    useEffect(() => {
        fetch('https://ec2-174-129-77-195.compute-1.amazonaws.com:8080/api/user/getAllTasks', {
            method: "GET",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            }
        }).then((res) => res.json())
            .then((result) => {
                setMyTasks(result);
            });
    }, []);
    useEffect(() => {
        fetch('https://ec2-174-129-77-195.compute-1.amazonaws.com:8080/api/task/totalTasks', {
            method: "GET",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            }
        }).then((res) => res.json())
            .then((result) => {
                setTotalTasks(result);
            });
    }, []);

    return {
        taskCount,
        myTasks,
        totalTasks
    }
}