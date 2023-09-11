import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

const TasksChart = () => {
    const chartReference = useRef(null);

    useEffect(() => {
        const chartContext = chartReference.current.getContext("2d");

        new Chart(chartContext, {
            type: "doughnut",
            data: {
                labels: ['Tasks Completed', 'Tasks Left'],
                datasets: [
                    {
                        label: 'Tasks',
                        data: [50, 50],
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
