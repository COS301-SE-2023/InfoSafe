import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
import {useCurrentTasks} from "./useCurrentTasks";

const TasksChart = () => {
    const chartReference = useRef(null);

    const {taskCount} = useCurrentTasks();
    useEffect(() => {
        const chartContext = chartReference.current.getContext("2d");

        new Chart(chartContext, {
            type: "doughnut",
            data: {
                labels: ['Tasks Completed', 'Tasks Left'],
                datasets: [
                    {
                        label: 'Tasks',
                        data: [50, taskCount],
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
    }, []);

    return (
        <div className="tasksChartDiv">
            <canvas className="doughnutChart" ref={chartReference} />
        </div>
    );
};

export default TasksChart;
