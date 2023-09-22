import {useState, useEffect} from "react";

export const useCurrentTasks = () => {
    const [taskCount, setTaskCount] = useState();
    useEffect(() => {
        fetch('http://localhost:8080/api/user/taskCount', {
            method: "GET",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            }
        }).then((res) => res.json())
            .then((result) => {
                setTaskCount(result);
            });
    }, []);
    return {
        taskCount
    }
}