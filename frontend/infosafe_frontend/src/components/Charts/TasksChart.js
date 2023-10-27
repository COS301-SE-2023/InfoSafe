import React, { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";

const TasksChart = () => {
    const chartReference = useRef(null);
    const [taskCount, setTaskCount] = useState(0);
    const [taskCompletedCount, setTaskCompletedCount] = useState(0);
    const [chartInstance, setChartInstance] = useState(null);

    useEffect(() => {
        fetch('https://infosafe.live/api/user/taskCount', {
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
        fetch('https://infosafe.live/api/task/getCompleted', {
            method: "GET",
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem('accessToken')
            }
        })
            .then((res) => res.json())
            .then((result) => {
                setTaskCompletedCount(result);
            })
            .catch((error) => {
                console.error("Error fetching taskCount:", error);
            });
    }, []);

    useEffect(() => {
        if (chartInstance) {
            chartInstance.destroy();
        }

        const chartContext = chartReference.current.getContext("2d");
        const newChartInstance = new Chart(chartContext, {
            type: "doughnut",
            data: {
                labels: ['Tasks Completed', 'Tasks Left'],
                datasets: [
                    {
                        label: 'Tasks',
                        data: [taskCompletedCount, taskCount],
                        backgroundColor: ['#00003E', '#444040'],
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

        setChartInstance(newChartInstance);
    }, [taskCount, taskCompletedCount]);

    return (
        <div className="tasksChartDiv">
            <canvas className="doughnutChart" ref={chartReference} />
        </div>
    );
};

export default TasksChart;
