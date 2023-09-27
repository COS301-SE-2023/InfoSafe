import React, { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";

const TasksChart = () => {
    const chartReference = useRef(null);
    const [taskCount, setTaskCount] = useState(0); // Initialize taskCount

    useEffect(() => {
        fetch('http://localhost:8080/api/user/taskCount', {
            method: "GET",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            }
        })
            .then((res) => res.json())
            .then((result) => {
                setTaskCount(result);
            })
            .catch((error) => {
                console.error("Error fetching taskCount:", error);
            });
    }, []);

    useEffect(() => {
        const chartContext = chartReference.current.getContext("2d");
        new Chart(chartContext, {
            type: "doughnut",
            data: {
                labels: ['Tasks Completed', 'Tasks Left'],
                datasets: [
                    {
                        label: 'Tasks',
                        data: [15, taskCount],
                        backgroundColor: ['#9E0000', '#444040'],
                    }
                ]
            },
            options: {
                hoverOffset: 6,
                plugins: {
                    legend: {
                        display: false,
                    },
                },
            }
        });
    }, [taskCount]);

    return (
        <div className="tasksChartDiv">
            <canvas className="doughnutChart" ref={chartReference} />
        </div>
    );
};

export default TasksChart;

