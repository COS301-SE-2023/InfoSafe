import {useEffect, useState} from "react";

export const useGetTask = () => {
    const [showTask, setShowTask] = useState([]);

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
            });
    }, []);

    return {
        showTask
    }
}